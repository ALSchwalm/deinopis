import React from "react";
import { withStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import Grow from "@material-ui/core/Grow";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";

const styles = theme => ({
    author: {
        overflow: "hidden",
        textOverflow: "ellipsis"
    }
});

function buildUrl(subreddit, id) {
  return "https://reddit.com/r/" + subreddit + "/comments/" + id;
}

function Result(props) {
  const { data, classes } = props;
  return (
    <Grow in={true}>
      <ListItem
        button
        component="a"
        target="_blank"
        href={buildUrl(data.suggestion.subreddit, data.suggestion.id)}
      >
        <Grid container justify="flex-start">
          <Grid item xs={2} sm={1}>
            {data.suggestion.score}
          </Grid>
          <Grid item xs={7}>
            {data.suggestion.title}
          </Grid>
          <Hidden only="xs">
            <Grid item sm={2} className={classes.author}>
              {data.suggestion.author}
            </Grid>
          </Hidden>
          <Grid item sm={2}>
            {data.suggestion.subreddit}
          </Grid>
        </Grid>
      </ListItem>
    </Grow>
  );
}

export default withStyles(styles)(Result);
