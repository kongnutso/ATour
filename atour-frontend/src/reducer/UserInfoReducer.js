import { combineReducers } from "redux";
import { LOGIN, LOGOUT } from "../action/ApplicationAction";

const initialState = {
  username: "",
  role: "Guide",
  userInfo: ""
};

function username(state = initialState.username, action) {
  switch (action.type) {
    case LOGIN:
      return action.payload.username;
    case LOGOUT:
      return "";
    default:
      return state;
  }
}

function userInfo(state = initialState.userInfo, action) {
  switch (action.type) {
    // case LOGIN:
    //   return action.payload.userInfo;
    case LOGOUT:
      return "";
    default:
      return state;
  }
}

function role(state = initialState.role, action) {
  switch (action.type) {
    case LOGIN:
      return action.payload.role;
    case LOGOUT:
      return "";
    default:
      return state;
  }
}

const reducer = combineReducers({ username, userInfo, role });

export default reducer;
