import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import SearchTabs from "./searchtabs";

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: 20
  },
  toolbar: theme.mixins.toolbar
});

function SearchGrid(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <div className={classes.toolbar} />
      <Grid container justify="center">
        <Grid item xs={12} sm={12} md={6}>
          <SearchTabs />
        </Grid>
      </Grid>
    </div>
  );
}

SearchGrid.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SearchGrid);
