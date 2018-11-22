import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { createStore } from "redux";
import { Provider } from "react-redux";
import appState from "./reducers";
import {
  setCount,
  setScore,
  setExcludedSubreddits,
  setUrlSearched,
  setTextSearched,
  setTab
} from "./actions";
import ReduxQuerySync from "redux-query-sync";

const store = createStore(appState);

ReduxQuerySync({
  store,
  params: {
    count: {
      selector: state => state.count,
      action: value => setCount(value),
      defaultValue: 10
    },
    score: {
      selector: state => state.score,
      action: value => setScore(value),
      defaultValue: 150
    },
    urlSearch: {
      selector: state => state.urlSearched,
      action: value => setUrlSearched(value),
      defaultValue: ""
    },
    textSearch: {
      selector: state => state.textSearched,
      action: value => setTextSearched(value),
      defaultValue: ""
    },
    excludedSubreddits: {
        selector: state => JSON.stringify(state.excludedSubreddits),
        action: value => setExcludedSubreddits(JSON.parse(value)),
        defaultValue: JSON.stringify([]),
    },
    tab: {
      selector: state => state.tab,
      action: value => setTab(value),
      stringToValue: string => JSON.parse(string),
      valueToString: value => JSON.stringify(value),
      defaultValue: 0
    }
  },
  initialTruth: "location",
  replaceState: true
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
