import React, { Component } from "react";
import { mockTour } from "./mock";
import GuideTourInfo from "./Guide/GuideTourInfo/GuideTourInfo";
import GuideViewPublishedTour from "../component/Guide/GuideViewPublishedTour";

class App extends Component {
  render() {
    return (
      <div className="App" tour>
        {/* <GuideTourInfo tour={mockTour} /> */}
        <GuideViewPublishedTour />
      </div>
    );
  }
}

export default App;
