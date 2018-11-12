import { combineReducers } from 'redux';
import userInfoReducer from './UserInfoReducer';
import modalReducer from './ModalReducer';
import BookedHistoryInfoReducer from './BookedHistoryInfoReducer';

const rootReducer = combineReducers({
  user: userInfoReducer,
  modal: modalReducer,
  bookedHistoryInfo: BookedHistoryInfoReducer
});

export default rootReducer;
