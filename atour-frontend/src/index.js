import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import promise from 'redux-promise';

import reducers from './reducer';
import App from './component/App';
import TopBanner from './component/TopBanner/TopBanner';
import BookedHistory from './component/BookedHistory/BookedHistory';
import EditProfile from './component/EditProfile/EditProfile';
import BookedHistoryInfo from './component/BookedHistoryInfo/BookedHistoryInfo';
import AdminApprovePage from './component/AdminApprovePage';
import AdminSearchPage from './component/AdminSearchPage';
import ViewDealtTripPage from './component/ViewDealtTripPage';
import SearchForTour from './component/SearchForTourPage';

// const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducers,
  /* preloadedState, */ composeEnhancers(applyMiddleware(promise))
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <Route path="/" render={props => <TopBanner transparent {...props} />} />
        <Switch>
          <Route exact path="/" component={App} />
          <Route exact path="/bookedHistory" component={BookedHistory} />
          <Route exact path="/editProfile" component={EditProfile} />
          <Route exact path="/bookedHistoryInfo" component={BookedHistoryInfo} />
          <Route exact path="/adminApprove" component={AdminApprovePage} />
          <Route exact path="/adminSearch" component={AdminSearchPage} />
          <Route exact path="/viewDealtTrips" component={ViewDealtTripPage} />
          <Route exact path="/searchForTour" component={SearchForTour} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
