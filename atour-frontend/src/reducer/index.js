import { combineReducers } from "redux";
import userInfoReducer from "./UserInfoReducer";
import modalReducer from "./ModalReducer";

const rootReducer = combineReducers({
  user: userInfoReducer,
  modal: modalReducer
});

export default rootReducer;
