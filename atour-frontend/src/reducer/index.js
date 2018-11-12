import { combineReducers } from "redux";
import userInfoReducer from "./UserInfoReducer";
import modalReducer from "./ModalReducer";
import applicationReducer from "./ApplicationReducer";
import BookedHistoryReducer from "./BookedHistoryReducer";
import BookedHistoryInfoReducer from "./BookedHistoryInfoReducer";

const rootReducer = combineReducers({
  user: userInfoReducer,
  modal: modalReducer,
  app: applicationReducer,
  bookedHistory: BookedHistoryReducer,
  bookedHistoryInfo: BookedHistoryInfoReducer
});

export default rootReducer;
