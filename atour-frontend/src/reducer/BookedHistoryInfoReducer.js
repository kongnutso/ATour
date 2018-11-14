import { combineReducers } from 'redux';
import { BOOK_TRIP, SELECT_BOOKED_TRIP } from '../action/BookAction';

const initialState = {
  tourStatus: 3,
  bookedDate: '1/1/2018',
  uploadedFileDate: '31/12/2018',
  bookedId: '1234',
  slip: 'a.jpg'
};

function tourStatus(state = initialState.tourStatus, action) {
  switch (action.type) {
    case BOOK_TRIP:
      return 1;
    case SELECT_BOOKED_TRIP:
      return action.payload.tourStatus;
    default:
      return state;
  }
}

function bookedDate(state = initialState.bookedDate, action) {
  switch (action.type) {
    case BOOK_TRIP:
      return action.payload.today;
    case SELECT_BOOKED_TRIP:
      return action.payload.bookedDate;
    default:
      return state;
  }
}

function uploadedFileDate(state = initialState.uploadedFileDate, action) {
  switch (action.type) {
    case BOOK_TRIP:
      return '';
    case SELECT_BOOKED_TRIP:
      return action.payload.uploadedFileDate;
    default:
      return state;
  }
}

function bookedId(state = initialState.bookedId, action) {
  switch (action.type) {
    case BOOK_TRIP:
      return '1';
    case SELECT_BOOKED_TRIP:
      return action.payload.bookedId;
    default:
      return state;
  }
}

function slip(state = initialState.slip, action) {
  switch (action.type) {
    case BOOK_TRIP:
      return '';
    case SELECT_BOOKED_TRIP:
      return action.payload.slip;
    default:
      return state;
  }
}

const reducer = combineReducers({
  tourStatus,
  bookedDate,
  uploadedFileDate,
  bookedId,
  slip
});

export default reducer;
