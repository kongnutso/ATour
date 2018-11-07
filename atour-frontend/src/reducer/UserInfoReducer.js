import { combineReducers } from "redux";
import { LOGIN } from "../action/ApplicationAction";

const initialState = {
  username: "",
  userInfo: ""
};

function username(state = initialState.username, action) {
  switch (action.type) {
    case LOGIN:
      return action.payload.username;
    default:
      return state;
  }
}

function userInfo(state = initialState.userInfo, action) {
  switch (action.type) {
    // case LOGIN:
    //   return action.payload.userInfo;
    default:
      return state;
  }
}

const reducer = combineReducers({ username, userInfo });

export default reducer;
