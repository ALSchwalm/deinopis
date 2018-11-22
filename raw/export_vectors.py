import spacy
import pickle
import h5py
import mmh3
import sys

nlp = spacy.load(sys.argv[1])

store = h5py.File("{}_vectors".format(sys.argv[1]))
store.create_dataset("vectors", shape=nlp.vocab.vectors.data.shape, dtype="f")
store["vectors"][:] = nlp.vocab.vectors.data
store.close()

print("Done exporting vectors")

key2row = {}

for i, string in enumerate(nlp.vocab.strings):
    spacy_hash = nlp.vocab.strings[string]
    our_hash = mmh3.hash64(string, signed=True)[0]
    if spacy_hash in nlp.vocab.vectors.key2row:
        key2row[our_hash] = nlp.vocab.vectors.key2row[spacy_hash]

print(len(key2row))

print("Done building key2row")
with open("{}_key2row".format(sys.argv[1]), "wb") as f:
    f.write(pickle.dumps(key2row))
