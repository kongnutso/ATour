import { combineReducers } from 'redux';
import userInfoReducer from './UserInfoReducer';
import modalReducer from './ModalReducer';
import BookedHistoryReducer from './BookedHistoryReducer';
import BookedHistoryInfoReducer from './BookedHistoryInfoReducer';

const rootReducer = combineReducers({
  user: userInfoReducer,
  modal: modalReducer,
  bookedHistory: BookedHistoryReducer,
  bookedHistoryInfo: BookedHistoryInfoReducer
});

export default rootReducer;
