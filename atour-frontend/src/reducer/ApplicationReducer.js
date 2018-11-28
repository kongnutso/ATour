import { combineReducers } from "redux";
import { RESIZE_WINDOW } from "../action/ApplicationAction";

const initialState = {
  width: window.innerWidth
};

function width(state = initialState.width, action) {
  switch (action.type) {
    case RESIZE_WINDOW:
      return action.payload;
    default:
      return state;
  }
}

const reducer = combineReducers({ width });

export default reducer;
