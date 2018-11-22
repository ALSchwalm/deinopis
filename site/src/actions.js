export const SET_COUNT = "SET_COUNT";
export const SET_SCORE = "SET_SCORE";
export const TOGGLE_SUBREDDIT = "TOGGLE_SUBREDDIT";
export const SET_EXCLUDED = "SET_EXCLUDED";
export const TOGGLE_ERROR = "TOGGLE_ERROR";
export const SET_ERROR_TEXT = "SET_ERROR_TEXT";
export const SET_URL_SEARCH = "SET_URL_SEARCH";
export const SET_URL_SEARCHED = "SET_URL_SEARCHED";
export const SET_TEXT_SEARCH = "SET_TEXT_SEARCH";
export const SET_TEXT_SEARCHED = "SET_TEXT_SEARCHED";
export const SET_TAB = "SET_TAB";
export const SET_LOADING = "SET_LOADING";

export function setScore(score) {
  return { type: SET_SCORE, score };
}

export function setCount(count) {
  return { type: SET_COUNT, count };
}

export function toggleSubreddit(subreddit) {
  return { type: TOGGLE_SUBREDDIT, subreddit };
}

export function setExcludedSubreddits(subreddits) {
  return { type: SET_EXCLUDED, subreddits };
}

export function toggleError() {
  return { type: TOGGLE_ERROR };
}

export function setErrorText(text) {
  return { type: SET_ERROR_TEXT, text };
}

export function setUrlSearch(text) {
  return { type: SET_URL_SEARCH, text };
}

export function setUrlSearched(text) {
  return { type: SET_URL_SEARCHED, text };
}

export function setTextSearch(text) {
  return { type: SET_TEXT_SEARCH, text };
}

export function setTextSearched(text) {
  return { type: SET_TEXT_SEARCHED, text };
}

export function setTab(number) {
  return { type: SET_TAB, number };
}

export function setLoading(loading) {
  return { type: SET_LOADING, loading };
}
