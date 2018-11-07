import { combineReducers } from "redux";
import userInfoReducer from "./userInfoReducer";
import modalReducer from "./modalReducer";

const rootReducer = combineReducers({
  user: userInfoReducer,
  modal: modalReducer
});

export default rootReducer;
