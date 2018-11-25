import { combineReducers } from "redux";
import userInfoReducer from "./UserInfoReducer";
import modalReducer from "./ModalReducer";
import applicationReducer from "./ApplicationReducer";
import BookedHistoryReducer from "./BookedHistoryReducer";
import BookedHistoryInfoReducer from "./BookedHistoryInfoReducer";
import searchReducer from "./searchReducer";
import tourReducer from "./TourReducer";
import guideReducer from "./GuideReducer";
import dealtTripReducer from "./DealtTripReducer";

const rootReducer = combineReducers({
  user: userInfoReducer,
  search: searchReducer,
  modal: modalReducer,
  app: applicationReducer,
  bookedHistory: BookedHistoryReducer,
  bookedHistoryInfo: BookedHistoryInfoReducer,
  tour: tourReducer,
  guide: guideReducer,
  dealtTrip: dealtTripReducer
});

export default rootReducer;
