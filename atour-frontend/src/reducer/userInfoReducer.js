import { combineReducers } from "redux";

const initialState = {
  userId: "",
  userInfo: ""
};

function user(state = initialState) {
  return initialState;
}

const reducer = combineReducers({ user });

export default reducer;
