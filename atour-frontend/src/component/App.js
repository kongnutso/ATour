import React, { Component } from "react";
import { Link } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Link to="/register">
        <button className="App">Register</button>
      </Link>
    );
  }
}

export default App;
