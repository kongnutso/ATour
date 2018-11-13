import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

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

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      <div>
        <Route path="/" component={TopBanner} />
        <Switch>
          <Route exact path="/" component={App} />
          <Route exact path="/bookedHistory" component={BookedHistory} />
          <Route exact path="/editProfile" component={EditProfile} />
          <Route exact path="/bookedHistoryInfo" component={BookedHistoryInfo} />
          <Route exact path="/adminApprove" component={AdminApprovePage} />
          <Route exact path="/adminSearch" component={AdminSearchPage} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
