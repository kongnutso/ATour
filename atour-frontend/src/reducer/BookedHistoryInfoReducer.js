import { combineReducers } from 'redux';
import {
  BOOK_TRIP,
  SELECT_BOOKED_TRIP,
  SET_IMAGE_SLIP
} from '../action/BookAction';

const initialState = {
  tourStatus: 2,
  bookedDate: '1/1/2018',
  uploadedFileDate: '31/12/2018',
  tourId: '5678',
  bookedId: '1234',
  slip: 'a.jpg'
};

function tourStatus(state = initialState.tourStatus, action) {
  switch (action.type) {
    case BOOK_TRIP:
      return 2;
    case SELECT_BOOKED_TRIP:
      //return action.payload._TripType
      return action.payload.tourStatus;
    case SET_IMAGE_SLIP:
      if (state === 2) return 3;
    default:
      return state;
  }
}

function bookedDate(state = initialState.bookedDate, action) {
  switch (action.type) {
    case BOOK_TRIP:
      return action.res.bookInfo.bookDate;
    case SELECT_BOOKED_TRIP:
      return action.payload.bookedDate; //eeeeeeeeeee
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
    case SET_IMAGE_SLIP:
      return action.payload.today;
    default:
      return state;
  }
}

function tourId(state = initialState.tourId, action) {
  switch (action.type) {
    case BOOK_TRIP:
      return action.payload.tourId;
    case SELECT_BOOKED_TRIP:
      return action.payload.tourId;
    default:
      return state;
  }
}

function bookedId(state = initialState.bookedId, action) {
  switch (action.type) {
    case BOOK_TRIP:
      return action.payload.tripId;
    case SELECT_BOOKED_TRIP:
      return action.payload.tripId; //eeeeeeeeeeee
    default:
      return state;
  }
}

function slip(state = initialState.slip, action) {
  switch (action.type) {
    case SET_IMAGE_SLIP:
      console.log(action.payload);
      return action.payload.url;

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
  slip,
  tourId
});

export default reducer;
