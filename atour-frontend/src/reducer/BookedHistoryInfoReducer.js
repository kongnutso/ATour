import { combineReducers } from "redux";
import {
  BOOK_TRIP,
  SELECT_BOOKED_TRIP,
  SET_IMAGE_SLIP,
  REFUND_TRIP,
  CANCEL_TRIP,
  CHANGE_REVIEW
} from "../action/BookAction";

const initialState = {
  _type: 6, //change from 1
  bookDate: "",
  tripDate: "",
  uploadedFileDate: "",
  bookedId: "",
  slip: "",
  guideId: "",
  tourName: "",
  price: "",
  groupSize: "",
  tripId: "",
  tourId: "",
  review: {}
};

function tourId(state = initialState.tourId, action) {
  switch (action.type) {
    case BOOK_TRIP:
    case SELECT_BOOKED_TRIP:
      return action.payload.tourId;
    default:
      return state;
  }
}
function tripId(state = initialState.tripId, action) {
  switch (action.type) {
    case BOOK_TRIP:
    case SELECT_BOOKED_TRIP:
      return action.payload.tripId;
    default:
      return state;
  }
}

function price(state = initialState.price, action) {
  switch (action.type) {
    case BOOK_TRIP:
    case SELECT_BOOKED_TRIP:
      if (action.payload._type === 0) return "Unbooked";

      return action.payload.price;
    default:
      return state;
  }
}

function groupSize(state = initialState.groupSize, action) {
  switch (action.type) {
    case BOOK_TRIP:
    case SELECT_BOOKED_TRIP:
      if (action.payload._type === 0) return "Unbooked";
      return action.payload.size;
    default:
      return state;
  }
}

function guideId(state = initialState.guideId, action) {
  switch (action.type) {
    case BOOK_TRIP:
    case SELECT_BOOKED_TRIP:
      return action.payload.guideId || state;
    default:
      return state;
  }
}

function tourName(state = initialState.tourName, action) {
  switch (action.type) {
    case BOOK_TRIP:
    case SELECT_BOOKED_TRIP:
      return action.payload.tourName;
    default:
      return state;
  }
}

function _type(state = initialState._type, action) {
  switch (action.type) {
    case BOOK_TRIP:
    case REFUND_TRIP:
    case CANCEL_TRIP:
    case SELECT_BOOKED_TRIP:
    case SET_IMAGE_SLIP:
      return action.payload._type;
    default:
      return state;
  }
}

function bookDate(state = initialState.bookDate, action) {
  switch (action.type) {
    case BOOK_TRIP:
    case SELECT_BOOKED_TRIP:
      if (action.payload._type === 0) return "unbooked";
      return action.payload.bookDate;
    default:
      return state;
  }
}

function tripDate(state = initialState.tripDate, action) {
  switch (action.type) {
    case BOOK_TRIP:
    case SELECT_BOOKED_TRIP:
      return action.payload.tripDate;
    default:
      return state;
  }
}

function uploadedFileDate(state = initialState.uploadedFileDate, action) {
  switch (action.type) {
    case BOOK_TRIP:
      return "-";
    case SELECT_BOOKED_TRIP:
    case SET_IMAGE_SLIP:
      if (action.payload._type < 2) return "";
      return action.payload.uploadedFileDate;
    default:
      return state;
  }
}

function slip(state = initialState.slip, action) {
  switch (action.type) {
    case BOOK_TRIP:
      return "";
    case SELECT_BOOKED_TRIP:
    case SET_IMAGE_SLIP:
      if (action.payload._type < 2) return "";
      if (action.payload.slip) {
        return action.payload.slip[action.payload.slip.length - 1].url;
      }
      return "";
    default:
      return state;
  }
}

function review(state = initialState.review, action) {
  switch (action.type) {
    case SELECT_BOOKED_TRIP:
    case CHANGE_REVIEW:
      return action.payload.review || {};
    default:
      return state;
  }
}

const reducer = combineReducers({
  _type,
  bookDate,
  uploadedFileDate,
  slip,
  tripDate,
  tourName,
  guideId,
  groupSize,
  price,
  tripId,
  tourId,
  review
});

export default reducer;
