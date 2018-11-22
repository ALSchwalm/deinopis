import React, { Component } from "react";
import TitleBar from "./appbar";
import SearchGrid from "./searchgrid";
import ErrorDialog from "./error";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <ErrorDialog />
          <TitleBar />
        </header>
        <SearchGrid />
      </div>
    );
  }
}

export default App;
