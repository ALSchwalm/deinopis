from utils import *
import time

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
