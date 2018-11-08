import { combineReducers } from 'redux';
import userInfoReducer from './UserInfoReducer';
import modalReducer from './ModalReducer';
import BookedHistoryReducer from './BookedHistoryReducer';

const rootReducer = combineReducers({
  user: userInfoReducer,
  modal: modalReducer,
  bookedHistory: BookedHistoryReducer
});

export default rootReducer;
