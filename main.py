import numpy
import pickle
import psycopg2
import praw
import mmh3
import heapq
import re
import os
import logging
from scipy.sparse import csc_matrix
from fuzzywuzzy import fuzz

MONITORED_SUBREDDITS = ["HFY", "nosleep"]

classifier = pickle.loads(open("classifier", "rb").read())
tokenizer = re.compile(r'\w+|[^\w\s]+', re.UNICODE | re.MULTILINE | re.DOTALL)

LDA_CLASSES = classifier.n_components
TITLE_SIMILARITY_RATIO=75
SCORE_INVERT_THRESHOLD = 0.4
USED_GROUP_THRESHOLD = 0.15
GROUP_VALUE_DIV = 4
POSTGRES_DATABASE = "db"
DEFAULT_COUNT = 10
DEFAULT_SCORE_THRESHOLD = 150
MIN_SCORE_THRESHOLD = 30
MAX_COUNT = 100
DEFAULT_UNKNOWN_WORD_FREQ = 1e-5

def info_for_word(conn, word):
    hash = mmh3.hash64(word, signed=True)[0]
    c = conn.cursor()
    c.execute("select vector, frequency from hashes join vectors on hashes.vec_id = vectors.vec_id where hash = %s",
              (hash,))
    row = c.fetchone()
    if row is None:
        return (numpy.zeros(300, dtype='f'), 0)
    return (pickle.loads(row[0]), row[1] or DEFAULT_UNKNOWN_WORD_FREQ)

def to_bag_of_words(conn, text):
  from collections import Counter
  counter = Counter()
  c = conn.cursor()
  #TODO: just do this once
  c.execute("select count(vec_id) from vectors")
  num_words = c.fetchone()[0]
  for word in tokenizer.finditer(text):
      word = word.group(0)
      hash = mmh3.hash64(word.lower(), signed=True)[0]
      c.execute("select vec_id from hashes where hash = %s", (hash,))
      row = c.fetchone()
      if row is None:
          continue
      counter[row[0]] += 1
  row_indexes = numpy.zeros(len(counter), dtype=numpy.uint8)
  column_indexes = numpy.fromiter(counter.keys(), dtype=numpy.uint32)
  values = numpy.fromiter(counter.values(), dtype=numpy.uint16)
  return csc_matrix((values, (row_indexes, column_indexes)), dtype=numpy.int16, shape=(1, num_words))

class InvalidText(Exception):
    pass

class SearchItem(object):
    def __init__(self, id, vector, group, author, score, title, subreddit):
        self.id = id
        if isinstance(vector, numpy.ndarray):
            self.vector = vector
        else:
            self.vector = pickle.loads(vector)
        self.author = author
        self.score = score
        self.title = title
        self.subreddit = subreddit
        self.group = numpy.array(group)

    def __repr__(self):
        return "SearchItem({}, {}, {}, {}, {}, {}, {})".format(
            self.id,
            "[...]",
            self.group,
            self.author,
            self.score,
            self.title,
            self.subreddit,
        )

    def json(self):
        return {
            "id": self.id,
            "score": self.score,
            "author": self.author,
            "title": self.title,
            "subreddit": self.subreddit
        }

    def __lt__(self, other):
        return self.id < other.id

def weighted_average(conn, text):
    weightpara = 1e-3
    vector = numpy.zeros(300, dtype='f')
    for token in tokenizer.finditer(text):
        token = token.group(0)
        v, p = info_for_word(conn, token.lower())
        vector += (weightpara / (weightpara + p)) * v

    ret = vector / numpy.linalg.norm(vector)
    if not ret.all() or numpy.isnan(ret).any():
        raise InvalidText("Text contains only unknown words")
    return ret

def related_items(item, other):
    if (item.author is None or
        other.author is None or
        item.title is None or
        other.title is None):
        return False
    elif item.author == other.author:
        return fuzz.partial_ratio(item.title, other.title) > TITLE_SIMILARITY_RATIO
    return False

def top_suggestions(iter, target, count, excluded):
    def score(item):
        return numpy.dot(target.vector, item.vector)

    selected = []
    for item in iter:
        if item.subreddit in excluded:
            continue
        raw_score = score(item)
        if len(selected) < count:
            heapq.heappush(selected, (raw_score, item))
            continue
        elif raw_score < heapq.nsmallest(1, selected)[0][0]:
            continue
        elif related_items(item, target):
            continue

        for i, (other_score, other_item) in enumerate(selected):
            if related_items(item, other_item):
                if raw_score > other_score:
                    selected[i] = (raw_score, item)
                    heapq.heapify(selected)
                    break
                else:
                    break
        else:
            heapq.heappushpop(selected, (raw_score, item))
    return selected


def suggestions_from_item(target, conn, score, count, excluded):
    group = items_by_group(conn, target.group, score)
    top = top_suggestions(group, target, count, excluded)

    # If we don't get a good match, look through everything else in the db
    if len(top) == 0 or heapq.nlargest(1, top)[0][0] < SCORE_INVERT_THRESHOLD:
        group = items_by_group(conn, target.group, score, inverse=True)
        other_top = top_suggestions(group, target, count, excluded)
        top = heapq.nlargest(count, heapq.merge(top, other_top))
    top.sort(reverse=True)
    return top


def insert_submission(conn, sub):
    logging.info("Inserting post with id={}".format(sub.id))
    c = conn.cursor()
    text = sub.selftext
    vec = weighted_average(conn, text)
    bow = to_bag_of_words(conn, text)
    group = classifier.transform(bow)[0]
    res = c.execute("""
    insert into data(author, created_utc, id, score,
                       subreddit, title, vector, {}
    )
    values (%s, %s, %s, %s, %s, %s, %s, {})
    """.format(",".join("group_{}".format(i) for i in range(LDA_CLASSES)),
               ",".join(["%s"]*LDA_CLASSES)),
         (sub.author.name if sub.author is not None else "[deleted]",
          sub.created_utc,
          sub.id,
          sub.score,
          sub.subreddit.display_name,
          sub.title,
          pickle.dumps(vec),
          *group))
    return SearchItem(sub.id, vec, group, sub.author, sub.score, sub.title,
                      sub.subreddit)


def fetch_item_from_db(conn, id):
    c = conn.cursor()
    c.execute("""
select id, vector, author, score, title, subreddit, {}
from data where id = %s""".format(",".join("group_{}".format(i) for i in range(LDA_CLASSES))),
                    (id,))
    res = c.fetchone()
    if res is None:
        return None
    id, vec, author, score, title, subreddit, *group = res
    return SearchItem(id, vec, group, author, score, title, subreddit)


def item_from_id(id, reddit, conn):
    item = fetch_item_from_db(conn, id)
    if item is not None:
        return item
    else:
        sub = praw.models.Submission(reddit, id=id)
        item = insert_submission(conn, sub)
        conn.commit()
        return item


def item_from_url(url, reddit, conn):
    sub = praw.models.Submission(reddit, url=url)
    return item_from_id(sub.id, reddit, conn)


def item_from_text(text, conn):
    vec = weighted_average(conn, text)
    bow = to_bag_of_words(conn, text)
    group = classifier.transform(bow)[0]
    return SearchItem(None, vec, group, None, None, None, None)

def calc_suggestions(conn, reddit, id, text, url, count, score, excluded_subreddits):
    try:
        if id is not None:
            target = item_from_id(id, reddit, conn)
        elif text is not None:
            target = item_from_text(text, conn)
        elif url is not None:
            target = item_from_url(url, reddit, conn)
    except InvalidText as e:
        return {"error": str(e)}
    suggestions = suggestions_from_item(target, conn, score=score, count=count,
                                        excluded=excluded_subreddits)

    return {
        "suggestions": [{
            "suggestion": item.json(),
            "raw_score": float(raw_score)
        } for (raw_score, item) in suggestions]
    }

def suggestions(event, context):
    id = event.get("id", None)
    text = event.get("text", None)
    url = event.get("url", None)
    excluded_subreddits = event.get("excluded_subreddits", [])

    if len([data for data in [id, text, url] if data is not None]) != 1:
        return {
            'statusCode': 400,
            'body': {"error": "Must be exactly one of 'id', 'text', or 'url'"}
        }
    if any([sub not in MONITORED_SUBREDDITS for sub in excluded_subreddits]):
        return {
            'statusCode': 400,
            'body': {"error": "Unknown excluded subreddit"}
        }
    elif all([(sub in excluded_subreddits) for sub in MONITORED_SUBREDDITS]):
        return {
            'statusCode': 400,
            'body': {"error": "All subreddits cannot be excluded"}
        }

    count = int(event.get("count", DEFAULT_COUNT))
    score = int(event.get("score", DEFAULT_SCORE_THRESHOLD))

    if count > MAX_COUNT:
        return {
            'statusCode': 400,
            'body': {"error": "'count' too large"}
        }
    if score < MIN_SCORE_THRESHOLD:
        return {
            'statusCode': 400,
            'body': {"error": "'score' too small"}
        }

    conn = psycopg2.connect(database="db", user="adam", password=os.environ["DEINOPIS_DB_PASSWORD"],
                            host=os.environ["DEINOPIS_DB_HOST"])
    reddit = praw.Reddit()
    reddit.read_only = True

    return {
        'statusCode': 200,
        'body': calc_suggestions(conn, reddit, id, text, url, count, score,
                                 excluded_subreddits)
    }


def items_by_group(conn, group, score, inverse=False):
    c = conn.cursor()
    used_groups = numpy.argwhere(group > USED_GROUP_THRESHOLD).flatten()
    if len(used_groups) == 0:
        c.execute("""
        select id, vector, author, score, title, subreddit
        from data where score > %s
        """, (score,))
    else:
        if inverse is False:
            rules = " and ".join(["group_{} >= %s".format(i) for i in used_groups])
        else:
            rules = " or ".join(["group_{} < %s".format(i) for i in used_groups])
        c.execute("""
        select id, vector, author, score, title, subreddit
        from data where score > %s and ({})
        """.format(rules), (score, *(group[used_groups]/GROUP_VALUE_DIV)))

    item = c.fetchone()
    while item is not None:
        id, vec, author, score, title, subreddit = item
        yield SearchItem(id, vec, None, author, score, title, subreddit)
        item = c.fetchone()

# --------------------------------------------------------------

def load_new_submissions(reddit, subreddit, conn):
    logging.info("Getting new submissions for '{}'".format(subreddit.display_name))
    for post in subreddit.new():
        if len(post.selftext) < 1000:
            continue
        try:
            item_from_id(post.id, reddit, conn)
        except InvalidText:
            logging.info("Can't score submission. Skipping")
            # Ignore posts we can't score at all
            continue


def update_subreddit(reddit, subreddit, conn):
    logging.info("Updating submissions for '{}'".format(subreddit.display_name))
    c = conn.cursor()

    # Update all posts from this hour 48 hours ago
    #NOTE: this will not necessarily run exactly once an hour (in
    #      fact it definitely won't. So we look at a two hour
    #      window to ensure we don't miss anything)
    c.execute("""
    select id
    from data where subreddit = %s and created_utc > %s and created_utc < %s
    """, (time.time() - 48*60*60, time.time() - 46*60*60, subreddit.display_name))

    for (id,) in c.fetchall():
        score = praw.models.Submission(reddit, id=id).score
        logging.info("Updating score for '{}' to {}".format(id, score))
        c.execute("""
        update data set score = %s where id = %s
        """, (score, id))
    conn.commit()


def monitor_subreddits():
    logging.info("Starting monitor thread")
    conn = psycopg2.connect(database="db", user="adam", password=os.environ["DEINOPIS_DB_PASSWORD"],
                            host=os.environ["DEINOPIS_DB_HOST"])
    reddit = praw.Reddit()
    reddit.read_only = True

    while True:
        for subreddit in MONITORED_SUBREDDITS:
            subreddit = reddit.subreddit(subreddit)
            load_new_submissions(reddit, subreddit, conn)
        time.sleep(60 * 30)

        for subreddit in MONITORED_SUBREDDITS:
            subreddit = reddit.subreddit(subreddit)
            update_subreddit(reddit, subreddit, conn)

        time.sleep(60 * 30)

if __name__ == "__main__":
    import threading

    logging.basicConfig(level=logging.INFO)
    thread = threading.Thread(target=monitor_subreddits)
    thread.start()
