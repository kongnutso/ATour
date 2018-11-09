import { combineReducers } from "redux";
import { LOGIN, LOGOUT, EDIT_USER_INFO } from "../action/ApplicationAction";

const initialState = {
  username: "",
  role: "Guide",
  userInfo: {
    gender: "Male",
    name: "Kongnut Songwattana",
    socialID: "1100600370761",
    birthDate: "03/13/2540",
    phone: "0817776720",
    email: "kongnut.s@hotmail.com"
  }
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
    case EDIT_USER_INFO:
      const input = action.payload;
      state.phone = input.phone;
      state.email = input.email;
      return state;
    case LOGOUT:
      return state;
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
