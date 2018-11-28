import { combineReducers } from "redux";
import { ON_CHANGE, ON_SEARCH_TOUR } from "../action/SearchAction";

const initialState = {
  term: ""
};

function searchName(state = initialState.term, action) {
  switch (action.type) {
    case ON_CHANGE:
      return action.payload;
    case ON_SEARCH_TOUR:
      return state;
    default:
      return state;
  }
}

export default searchName;
