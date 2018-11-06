import { combineReducers } from "redux";
import userInfoReducer from "./userInfoReducer";
import { reducer as formReducer } from "redux-form";

const rootReducer = combineReducers({
  user: userInfoReducer,
  form: formReducer
});

export default rootReducer;
