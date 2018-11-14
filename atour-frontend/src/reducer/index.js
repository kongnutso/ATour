import { combineReducers } from 'redux';
import userInfoReducer from './UserInfoReducer';
import modalReducer from './ModalReducer';
import applicationReducer from './ApplicationReducer';
import BookedHistoryReducer from './BookedHistoryReducer';
import BookedHistoryInfoReducer from './BookedHistoryInfoReducer';
import tourInfoReducer from './TourInfoReducer';
import searchReducer from './searchReducer';
import tourReducer from './TourReducer';

const rootReducer = combineReducers({
  user: userInfoReducer,
  search: searchReducer,
  modal: modalReducer,
  app: applicationReducer,
  bookedHistory: BookedHistoryReducer,
  bookedHistoryInfo: BookedHistoryInfoReducer,
  tourInfo: tourInfoReducer,
  tour: tourReducer
});

export default rootReducer;
