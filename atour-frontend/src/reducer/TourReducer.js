import { combineReducers } from 'redux';
import { SELECT_TOUR } from '../action/SelectAction';
import { ON_SEARCH_TOUR } from '../action/SearchAction';
const initialState = {
  tourList: [],
  selectedTour: {
    tourName: '',
    tourimage: '',
    tourRating: '',
    price: '',
    detail: '',
    minGroupSize: '',
    maxGroupSize: '',
    availableDates: '',
    guideName: '',
    location: ''
  }
};

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

const reducer = combineReducers({ tourList, selectedTour });
export default reducer;
