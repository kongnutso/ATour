import { combineReducers } from "redux";
import { SELECT_TOUR } from "../action/SelectAction";
import { ON_SEARCH_TOUR } from "../action/SearchAction";
import {
  BOOK_TRIP_ERROR,
  BOOK_TRIP,
  CLEAR_BOOK_MESSAGE
} from "../action/BookAction";
const initialState = {
  tourList: [],
  selectedTour: {
    tourName: "",
    tourimage: "",
    tourRating: "",
    price: "",
    detail: "",
    minGroupSize: "",
    maxGroupSize: "",
    availableDates: "",
    guideName: "",
    location: ""
  },
  bookMessage: ""
};

function bookMessage(state = initialState.bookMessage, action) {
  switch (action.type) {
    case BOOK_TRIP:
      return "done";
    case BOOK_TRIP_ERROR:
      return action.payload.message;
    case CLEAR_BOOK_MESSAGE:
      return "";
    default:
      return state;
  }
}

function tourList(state = initialState.tourList, action) {
  switch (action.type) {
    case ON_SEARCH_TOUR:
      return action.payload;
    default:
      return state;
  }
}

function selectedTour(state = initialState.selectedTour, action) {
  switch (action.type) {
    case SELECT_TOUR:
      return action.payload;
    default:
      return state;
  }
}

const reducer = combineReducers({ tourList, selectedTour, bookMessage });
export default reducer;
