import { combineReducers } from "redux";
import {
  SET_COUNT,
  SET_SCORE,
  TOGGLE_SUBREDDIT,
  TOGGLE_ERROR,
  SET_ERROR_TEXT,
  SET_EXCLUDED,
  SET_URL_SEARCH,
  SET_URL_SEARCHED,
  SET_TEXT_SEARCH,
  SET_TEXT_SEARCHED,
  SET_TAB,
  SET_LOADING
} from "./actions";

function score(state = 150, action) {
  switch (action.type) {
    case SET_SCORE:
      return action.score;
    default:
      return state;
  }
}

function count(state = 10, action) {
  switch (action.type) {
    case SET_COUNT:
      return action.count;
    default:
      return state;
  }
}

function errorOpen(state = false, action) {
  switch (action.type) {
    case TOGGLE_ERROR:
      return !state;
    default:
      return state;
  }
}

function errorText(state = "", action) {
  switch (action.type) {
    case SET_ERROR_TEXT:
      return action.text;
    default:
      return state;
  }
}

function urlSearched(state = "", action) {
  switch (action.type) {
    case SET_URL_SEARCHED:
      return action.text;
    default:
      return state;
  }
}

function urlSearch(state = "", action) {
  switch (action.type) {
    case SET_URL_SEARCH:
      return action.text;
    default:
      return state;
  }
}

function textSearched(state = "", action) {
  switch (action.type) {
    case SET_TEXT_SEARCHED:
      return action.text;
    default:
      return state;
  }
}

function textSearch(state = "", action) {
  switch (action.type) {
    case SET_TEXT_SEARCH:
      return action.text;
    default:
      return state;
  }
}

function tab(state = 0, action) {
  switch (action.type) {
    case SET_TAB:
      return action.number;
    default:
      return state;
  }
}

function loading(state = false, action) {
  switch (action.type) {
    case SET_LOADING:
      return action.loading;
    default:
      return state;
  }
}

function excludedSubreddits(state = [], action) {
  switch (action.type) {
    case SET_EXCLUDED:
      return action.subreddits;
    case TOGGLE_SUBREDDIT:
      if (state.includes(action.subreddit)) {
        state = state.filter(item => item !== action.subreddit);
      } else {
        state = state.concat(action.subreddit);
      }
      return state;
    default:
      return state;
  }
}

const appState = combineReducers({
  count,
  score,
  excludedSubreddits,
  errorOpen,
  errorText,
  urlSearch,
  urlSearched,
  textSearch,
  textSearched,
  tab,
  loading
});

export default appState;
