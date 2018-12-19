import React from "react";
import { withStyles } from "@material-ui/core/styles";
import SearchBar from "material-ui-search-bar";
import Chip from "@material-ui/core/Chip";
import Results from "./results";
import isUrl from "is-url";
import { connect } from "react-redux";
import {
  toggleError,
  setErrorText,
  setTextSearch,
  setTextSearched,
  setUrlSearch,
  setUrlSearched,
  setLoading
} from "./actions";

const styles = theme => ({
  results: {
    marginTop: 20
  },
  chips: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap"
  },
  chip: {
    margin: theme.spacing.unit
  },
  examples: {
    marginTop: 40
  }
});

class KeywordUrlSearch extends React.Component {
  state = {
    data: []
  };

  constructor(props) {
    super(props);
    this.search = this.search.bind(this);
    this.onChipClick = this.onChipClick.bind(this);
    this.onCancel = this.onCancel.bind(this);
  }

  componentDidMount() {
    if (this.props.urlSearched) {
      this.props.setUrlSearch(this.props.urlSearched);
      this.search(this.props.urlSearched);
    }
  }

  componentDidUpdate(prevProps) {
    if (
      (this.props.score !== prevProps.score ||
        this.props.count !== prevProps.count ||
        this.props.excluded !== prevProps.excluded) &&
      (typeof this.props.score !== "undefined" &&
        typeof this.props.count !== "undefined" &&
        typeof this.props.excluded !== "undefined" &&
        typeof this.props.urlSearch !== "undefined")
    ) {
      this.search(this.props.urlSearch);
    }
  }

  onChipClick(value) {
    this.props.setUrlSearch(value);
    this.search(value);
  }

  onCancel() {
    this.props.setUrlSearch("");
    this.props.setUrlSearched("");
    this.setState({ data: [] });
  }

  search(value) {
    if (value === "") {
      return;
    }

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://18.191.81.5:8000/suggestions", true);
    xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");

    if (!isUrl(value) && isUrl("http://" + value)) {
      value = "http://" + value;
    }
    if (isUrl(value)) {
      xhr.send(
        JSON.stringify({
          count: this.props.count,
          url: value,
          score: this.props.score,
          excluded_subreddits: this.props.excluded
        })
      );
    } else {
      xhr.send(
        JSON.stringify({
          count: this.props.count,
          text: value,
          score: this.props.score,
          excluded_subreddits: this.props.excluded
        })
      );
    }

    xhr.onloadend = e => {
      this.props.setLoading(false);
      if (xhr.status === 0) {
        this.props.setError("Unable to connect to server");
        return;
      }
      let resp = JSON.parse(xhr.responseText);
      let data = resp.body.suggestions;
      if (!data) {
        this.props.setError(resp.body.error);
        return;
      }

      // Clear the state first so we get the animation
      this.setState({ data: [] });
      this.setState({ data: data });
    };

    this.props.setLoading(true);
    this.props.setUrlSearched(value);
    this.props.setTextSearched("");
    this.props.setTextSearch("");
  }

  render() {
    const { classes } = this.props;

    let examples;
    if (!this.state.data.length || !this.props.urlSearched) {
      let labels = [
        "space cat",
        "spooky ghost",
        "elf",
        "reddit.com/r/HFY/comments/5tcesp"
      ];

      examples = (
        <div className={classes.examples}>
            <p>Can&#39;t think of anything? Try one of these examples:</p>
          <div className={classes.chips}>
            {labels.map((label, i) => {
              return (
                <Chip
                  label={label}
                  key={i}
                  className={classes.chip}
                  onClick={() => this.onChipClick(label)}
                />
              );
            })}
          </div>
        </div>
      );
    } else {
      examples = null;
    }

    return (
      <div>
        <SearchBar
          onChange={this.props.setUrlSearch}
          onRequestSearch={this.search}
          onCancelSearch={this.onCancel}
          value={this.props.urlSearch}
        />
        {examples}
        <div className={classes.results}>
          {this.props.urlSearched && <Results data={this.state.data} />}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    score: state.score,
    count: state.count,
    excluded: state.excludedSubreddits,
    urlSearch: state.urlSearch,
    urlSearched: state.urlSearched
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setError: text => {
      dispatch(setErrorText(text));
      dispatch(toggleError());
    },
    setUrlSearched: text => {
      dispatch(setUrlSearched(text));
    },
    setUrlSearch: text => {
      dispatch(setUrlSearch(text));
    },
    setTextSearched: text => {
      dispatch(setTextSearched(text));
    },
    setTextSearch: text => {
      dispatch(setTextSearch(text));
    },
    setLoading: loading => {
      dispatch(setLoading(loading))
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(KeywordUrlSearch));
