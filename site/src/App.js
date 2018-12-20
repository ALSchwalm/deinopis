import React, { Component } from "react";
import Hidden from "@material-ui/core/Hidden";
import TitleBar from "./appbar";
import SearchGrid from "./searchgrid";
import ErrorDialog from "./error";

class App extends Component {
  render() {
    let ribbon = (
      <Hidden xsDown>
        <a href="https://github.com/ALSchwalm/deinopis">
          <img
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              border: 0,
              zIndex: 1299
            }}
            src="https://s3.amazonaws.com/github/ribbons/forkme_right_green_007200.png"
            alt="Fork me on GitHub"
          />
        </a>
      </Hidden>
    );

    return (
      <div className="App">
        <header className="App-header">
          {ribbon}
          <ErrorDialog />
          <TitleBar />
        </header>
        <SearchGrid />
      </div>
    );
  }
}

export default App;
