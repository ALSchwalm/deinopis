import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import SwipeableViews from "react-swipeable-views";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import KeywordUrlSearch from "./urlsearch";
import TextSearch from "./textsearch";
import { connect } from "react-redux";
import { setTab } from "./actions";

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired
};

const styles = theme => ({});

class SearchTabs extends React.Component {
  handleChange = (event, value) => {
    this.props.setTab(value);
  };

  handleChangeIndex = index => {
    this.props.setTab(index);
  };


  render() {
    const { theme } = this.props;

    return (
      <div>
        <AppBar position="static" color="default">
          <Tabs
            value={this.props.tab}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            fullWidth
          >
            <Tab label="Keyword or URL" />
            <Tab label="Text" />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={this.props.tab}
          onChangeIndex={this.handleChangeIndex}
        >
          <TabContainer dir={theme.direction}>
            <KeywordUrlSearch />
          </TabContainer>
          <TabContainer dir={theme.direction}>
            <TextSearch />
          </TabContainer>
        </SwipeableViews>
      </div>
    );
  }
}

SearchTabs.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    tab: state.tab
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setTab: number => {
      dispatch(setTab(number));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, { withTheme: true })(SearchTabs));
