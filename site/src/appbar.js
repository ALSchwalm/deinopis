import React from "react";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Drawer from "@material-ui/core/Drawer";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";
import Hidden from "@material-ui/core/Hidden";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import FormHelperText from "@material-ui/core/FormHelperText";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import FormGroup from "@material-ui/core/FormGroup";
import { connect } from "react-redux";
import { setScore, setCount, toggleSubreddit } from "./actions";

const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerContents: {
     paddingLeft: 20,
     paddingTop: 20
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3
  },
  menuButton: {
    marginRight: 20,
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  },
  excluded: {
    paddingTop: 30
  },
  toolbar: theme.mixins.toolbar
});

class TitleBar extends React.Component {
  state = {
    mobileOpen: false
  };

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  render() {
    const { classes } = this.props;

    const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
    const subreddits = ["HFY", "nosleep"];
    const drawer = (
      <div className={classes.drawerContents}>
        <FormControl>
          <InputLabel htmlFor="score-helper">
            Min Score
          </InputLabel>
          <Select
            value={this.props.score}
            onChange={this.props.setScore}
            input={<Input name="score" id="score-helper" />}
          >
            <MenuItem value={50}>50</MenuItem>
            <MenuItem value={150}>150</MenuItem>
            <MenuItem value={300}>300</MenuItem>
            <MenuItem value={500}>500</MenuItem>
          </Select>
          <FormHelperText>Minimum score for results</FormHelperText>
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="count-helper">
            Count
          </InputLabel>
          <Select
            value={this.props.count}
            onChange={this.props.setCount}
            input={<Input name="count" id="count-helper" />}
          >
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={20}>20</MenuItem>
            <MenuItem value={50}>50</MenuItem>
            <MenuItem value={100}>100</MenuItem>
          </Select>
          <FormHelperText>Number of results to show</FormHelperText>
        </FormControl>

        <FormControl component="fieldset">
          <FormLabel component="legend" className={classes.excluded}>
            Excluded Subreddits
          </FormLabel>
          <FormGroup>
            {subreddits.map((sub, index) => (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.props.excluded.includes(sub)}
                    onChange={() => this.props.toggleSubreddit(sub)}
                    value={sub}
                  />
                }
                key={index}
                label={sub}
              />
            ))}
          </FormGroup>
        </FormControl>
      </div>
    );

    return (
      <div className={classes.root}>
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap>
              Deinopis
            </Typography>
          </Toolbar>
        </AppBar>
        <Hidden mdUp implementation="css">
          <SwipeableDrawer
            disableBackdropTransition={!iOS}
            disableDiscovery={iOS}
            className={classes.drawer}
            variant="temporary"
            open={this.state.mobileOpen}
            onOpen={this.handleDrawerToggle}
            onClose={this.handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper
            }}
          >
            {drawer}
          </SwipeableDrawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper
            }}
            variant="permanent"
            open
          >
            <div className={classes.toolbar} />
            {drawer}
          </Drawer>
        </Hidden>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    score: state.score,
    count: state.count,
    excluded: state.excludedSubreddits
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setScore: score => {
      dispatch(setScore(parseInt(score.target.value)));
    },
    setCount: count => {
      dispatch(setCount(parseInt(count.target.value)));
    },
    toggleSubreddit: subreddit => {
      dispatch(toggleSubreddit(subreddit));
    }
  };
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(TitleBar)
);
