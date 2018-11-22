import React from "react";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Result from "./result";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import { connect } from "react-redux";
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper
  },
  loading: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    marginTop: 100
  }
});

class Results extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.data !== nextProps.data ||
        this.props.loading !== nextProps.loading) {
      return true;
    }
    return false;
  }

  render() {
    const { classes, data } = this.props;

      if (this.props.loading) {

          return (
              <div className={classes.loading}>
               <CircularProgress />
              </div>
          );
      }

    let heading;
    if (data.length) {
      heading = (
        <ListItem key="header">
          <Grid container justify="flex-start">
            <Grid item xs={2} sm={1}>
              <b>Score</b>
            </Grid>
            <Grid item xs={7}>
              <b>Title</b>
            </Grid>
            <Hidden only="xs">
              <Grid item sm={2}>
                <b>Author</b>
              </Grid>
            </Hidden>
            <Grid item sm={2}>
              <b>Subreddit</b>
            </Grid>
          </Grid>
        </ListItem>
      );
    } else {
      heading = null;
    }

    return (
      <div className={classes.root}>
        <List>
          {heading}
          {data.map(function(result, i) {
            return <Result data={result} key={i} />;
          })}
        </List>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.loading,
  };
};

export default connect(mapStateToProps)(withStyles(styles)(Results));
