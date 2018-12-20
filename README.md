deinopis
--------

Deinopis is an attempt to perform natural language processing on reddit selfposts in order
to generate similarity scores. This service powers a web interface (available [here](https://alschwalm.com/deinopis))
that provides related posts for a given set of keywords or selfposts.

How it works
------------

Let me preface this section by saying that this project was my first foray into NLP, so
there is really not much academic basis for the choices I've made here. Mostly they just
seemed to work pretty well. With that being said:

Most of the data for Deinopis was gathered from the reddit archive on Google BigQuery.
This gives me access to selfposts in given subreddits back to the start of reddit. I
exported the data from there (currently only targetting 'r/hfy' and 'r/nosleep'). Then,
I download the [PARAGRAM-SL999](https://cogcomp.org/page/resource_view/106) word embeddings
to serve as the vocabulary. From here, I calculate the statistical frequency of each word.

From here, we can train an [LDA classifier](https://scikit-learn.org/stable/modules/generated/sklearn.decomposition.LatentDirichletAllocation.html)
on the existing documents we downloaded. I arbitrarily chose 10 as the number of components.
This classifier will be useful as we want to avoid searching the entire database for good
matches. Logically, we could do some kind of clustering to avoid looking in the entirely
wrong area for similar posts, but in practice these perform very poorly (presumably due
to the very high dimensionality of the word vectors). Using the LDA transformation as
as a 'grouping', we can select only those posts that have a similar (or greater) probabiliy
of being in a given group. This allows us to only search about half of the database on
average, while still retaining over 90% of the top 100 best matches.

At run time, we use the classifier to select the best search candidates from the database,
and then compute a document vector via the weighted averaging of word vectors described
in [this paper](https://openreview.net/forum?id=SyK00v5xx). The top `n` candidates are
selected by comparing the dot product of these weighted vectors.

This seems to produce intuitive results. One easy check for this is just that those posts
that are deemed most-similar are often by the same other about the same topic. It additionally
seems to work for keywords. So searching for 'dog' returns mostly dog related items.