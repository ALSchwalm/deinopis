import React from "react";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Results from "./results";
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

const styles = {
  button: {
    marginTop: 20
  }
};

class TextSearch extends React.Component {
  state = {
    data: []
  };

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.search = this.search.bind(this);
  }

  handleChange(event) {
    this.props.setTextSearch(event.target.value);
  }

  componentDidMount() {
    if (this.props.textSearched) {
      this.props.setTextSearch(this.props.textSearched);
      this.search(this.props.textSearched);
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
        typeof this.props.textSearch !== "undefined")
    ) {
      this.search(this.props.textSearch);
    }
  }

  search(value) {
    if (value === "") {
      return;
    }

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://18.191.81.5:8000/suggestions", true);
    xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");

    xhr.send(
      JSON.stringify({
        count: this.props.count,
        score: this.props.score,
        text: value,
        excluded_subreddits: this.props.excluded
      })
    );

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
    this.props.setTextSearched(value);
    this.props.setUrlSearched("");
    this.props.setUrlSearch("");
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <div>
          <TextField
            multiline
            rows="12"
            fullWidth
            variant="outlined"
            placeholder="Enter your search text here"
            onChange={this.handleChange}
            value={this.props.textSearch}
          />
        </div>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={() => this.search(this.props.textSearch)}
        >
          Search
        </Button>
        {this.props.textSearched && <Results data={this.state.data} />}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    score: state.score,
    count: state.count,
    excluded: state.excludedSubreddits,
    textSearch: state.textSearch,
    textSearched: state.textSearched
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setError: text => {
      dispatch(setErrorText(text));
      dispatch(toggleError());
    },
    setTextSearched: text => {
      dispatch(setTextSearched(text));
    },
    setTextSearch: text => {
      dispatch(setTextSearch(text));
    },
    setUrlSearched: text => {
      dispatch(setUrlSearched(text));
    },
    setUrlSearch: text => {
      dispatch(setUrlSearch(text));
    },
    setLoading: loading => {
      dispatch(setLoading(loading))
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(TextSearch));
