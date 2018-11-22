import spacy
import pickle
import os
import csv
import nltk
import h5py
import mmh3
import numpy as np
import psycopg2
from sklearn.decomposition import LatentDirichletAllocation
from scipy.sparse import csc_matrix

LDA_CLASSES = 10

key2row = pickle.loads(open("paragram_key2row", "rb").read())
vectors = h5py.File("paragram_vectors")["vectors"][:]
tokenizer = nltk.tokenize.regexp.WordPunctTokenizer()
classifier = LatentDirichletAllocation(n_components=LDA_CLASSES, random_state=0)

def vector_for_word(word):
    hash = mmh3.hash64(word, signed=True)[0]
    if hash not in key2row:
        return np.zeros((vectors.shape[1]), dtype='f')
    return vectors[key2row[hash]]


def to_bag_of_words(text):
  from collections import Counter
  counter = Counter()
  for word in tokenizer.tokenize(text):
    hash = mmh3.hash64(word.lower(), signed=True)[0]
    if hash not in key2row:
      continue
    counter[int(key2row[hash])] += 1
  row_indexes = np.zeros(len(counter), dtype=np.uint8)
  column_indexes = np.array(list(counter.keys()), dtype=np.uint32)
  values = np.array(list(counter.values()), dtype=np.uint16)
  return csc_matrix((values, (row_indexes, column_indexes)), dtype=np.int16, shape=(1, len(vectors)))

def item_iterator():
  files = os.listdir("./csv/")
  for file in files:
    file = os.path.join("./csv", file)
    with open(file) as csvfile:
      reader = csv.DictReader(csvfile)
      for i, row in enumerate(reader):
        yield i, row

db=psycopg2.connect(database="db", user="adam")
c = db.cursor()
c.execute("""create table data (
        created_utc integer not null,
        subreddit varchar(20) not null,
        author varchar(20) not null,
        score integer not null,
        title varchar(300) not null,
        id varchar(10) primary key not null,
        vector bytea not null,
        {}
)""".format(",".join("group_{} float not null".format(i) for i in range(LDA_CLASSES))))

c.execute("""CREATE TABLE vectors (
        vec_id integer primary key not null,
        vector bytea not null
)""")

c.execute("""
    CREATE TABLE hashes (
        hash bigint primary key not null,
        vec_id integer references vectors (vec_id),
        frequency float not null
    );
""")

def load_frequencies():
  from collections import Counter
  print("Calculating frequencies")
  words = Counter()
  for _, row in item_iterator():
    for token in tokenizer.tokenize(row["selftext"]):
      words[token.lower()] += 1
  total = sum(k for k in words.values())
  out = {}
  for word in words:
    hash = mmh3.hash64(word.lower(), signed=True)[0]
    out[hash] = words[word] / total
  return out

frequencies = load_frequencies()

def load_row2vec():
    for hash, row in key2row.items():
        c.execute("""insert into vectors (vec_id, vector)
          values (%s, %s)
          ON CONFLICT DO NOTHING
        """, (int(row), pickle.dumps(vectors[row]),))

        c.execute("insert into hashes(hash, vec_id, frequency) values (%s, %s, %s)",
                  (hash, int(row), frequencies.get(hash, 1e-5)))

print("Loading row2vec")
load_row2vec()
print("Done loading row2vec")

print("Training Classifier")
def vectorize(text, frequencies):
  weightpara = 1e-3
  vector = np.zeros((vectors.shape[1]), dtype='f')
  for token in tokenizer.tokenize(text):
    v = vector_for_word(token.lower())
    hash = mmh3.hash64(token.lower(), signed=True)[0]
    p = frequencies[hash] or 1e-5
    vector += (weightpara / (weightpara + p)) * v
  return vector / np.linalg.norm(vector)

for i, row in item_iterator():
  #TODO: make this configurable
  if i % 100 == 0:
    classifier.partial_fit(to_bag_of_words(row["selftext"]))

with open("classifier", "wb") as f:
  f.write(pickle.dumps(classifier))

print("Finished training classifier. Building db")

for i, row in item_iterator():
  if i % 1000 == 0:
    db.commit()
    print(i)
  n = vectorize(row["selftext"], frequencies)
  vec = pickle.dumps(n)
  groups = classifier.transform(to_bag_of_words(row["selftext"]))[0]
  del row["selftext"]
  c.execute("""
insert into data (
        created_utc,
        subreddit,
        author,
        score,
        title,
        id,
        vector,
        {}
      ) values (
        %s, %s, %s, %s, %s, %s, %s, {}
      )
""".format(",".join("group_{}".format(i) for i in range(LDA_CLASSES)),
           ",".join(["%s"]*LDA_CLASSES)),
            (int(row["created_utc"]),
             row["subreddit"],
             row["author"],
             int(row["score"]),
             row["title"],
             row["id"],
             vec,
             *groups))
  db.commit()
