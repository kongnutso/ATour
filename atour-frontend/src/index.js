import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import reducers from "./reducer";
import App from "./component/App";
import TopBanner from "./component/TopBanner/TopBanner";
import BookedHistory from "./component/BookedHistory/BookedHistory";
import EditProfile from "./component/EditProfile/EditProfile";
import BookedHistoryInfo from "./component/BookedHistoryInfo/BookedHistoryInfo";

import ViewDealtTripPage from "./component/ViewDealtTripPage";
import SearchFor from "./component/SearchFor";
import CustomerTourInfo from "./component/CustomerTourInfo/CustomerTourInfo";
import GuideInfo from "./component/GuideInfo/GuideInfo";
import GuideHome from "./component/Guide/GuideHome";
import GuideTourInfo from "./component/Guide/GuideTourInfo/GuideTourInfo";
import GuideViewPublishedTour from "./component/Guide/GuideViewPublishedTour";

import AdminHome from "./component/AdminHome";
import AdminLogin from "./component/AdminLogin";
require("dotenv").config();

// const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const store = createStore(
//   reducers,
//   /* preloadedState, */ composeEnhancers(applyMiddleware(promise))
// );

const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <Route
          path="/"
          render={props => <TopBanner transparent {...props} />}
        />
        <Switch>
          <Route exact path="/" component={App} />
          {/* <Route exact path="/" component={GuideHome} /> */}
          <Route exact path="/bookedHistory" component={BookedHistory} />
          <Route exact path="/editProfile" component={EditProfile} />
          <Route
            exact
            path="/bookedHistoryInfo"
            component={BookedHistoryInfo}
          />
          <Route exact path="/customerTourInfo" component={CustomerTourInfo} />
          <Route exact path="/guideInfo" component={EditProfile} />
          <Route exact path="/minda" component={AdminLogin} />
          <Route path="/minda/:type" component={AdminHome} />

          <Route exact path="/viewDealtTrips" component={ViewDealtTripPage} />
          <Route exact path="/searchForTour" component={SearchFor} />
          <Route exact path="/searchForGuide" component={SearchFor} />
          <Route exact path="/guideHome" component={GuideHome} />
          <Route exact path="/guideTourInfo" component={GuideTourInfo} />
          <Route exact path="/publishedTour" component={GuideHome} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
