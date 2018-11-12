import { combineReducers } from "redux";
import userInfoReducer from "./UserInfoReducer";
import modalReducer from "./ModalReducer";
import applicationReducer from "./ApplicationReducer";

const rootReducer = combineReducers({
  user: userInfoReducer,
  modal: modalReducer,
  app: applicationReducer
});

export default rootReducer;
