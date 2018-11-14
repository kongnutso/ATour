import { combineReducers } from 'redux';

const initialState = {
  tour: [],
  selectedTour: {
    tourName: '',
    tourimage: '',
    tourRating: '',
    price: '',
    tourDetail: '',
    minGroupSize: '',
    maxGroupSize: '',
    availableDates: '',
    guideName: '',
    location: ''
  }
};

function tour(state = initialState.tour, action) {
  switch (action.type) {
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

const reducer = combineReducers({ tour, selectedTour });
export default reducer;
