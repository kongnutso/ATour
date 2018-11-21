import axios from 'axios';

export const BOOK_TRIP = 'BOOK_TRIP';
export const BOOK_TRIP_ERROR = 'BOOK_TRIP_ERROR';
export const CLEAR_BOOK_MESSAGE = '  CLEAR_BOOK_MESSAGE';

export function clearBookMessage() {
  return { type: CLEAR_BOOK_MESSAGE };
}

export function bookTrip(
  tourName,
  tourId,
  tripInfo,
  price,
  size,
  customerId,
  guideId
) {
  return async dispatch => {
    try {
      const req = {
        tourName: tourName,
        tourId: tourId,
        tripId: tripInfo.tripId,
        tripDate: tripInfo.tripDate,
        customerId,
        size,
        price,
        guideId
      };
      const res = await axios
        .post('http://localhost:3000/customer/bookTrip', req)
        .then(res => {
          return res.data;
        });
      console.log(res.error);
      if (res.error) {
        return dispatch({
          type: BOOK_TRIP_ERROR,
          payload: { message: res.error }
        });
      } else {
        console.log(res);
        const payload = await getTrip(res.tripId);
        console.log(payload);
        return dispatch({
          type: BOOK_TRIP,
          payload
        });
      }
    } catch (e) {
      console.log(e);
    }
  };
}

async function getTrip(tripId) {
  try {
    const res = await axios
      .get(`http://localhost:3000/trip/${tripId}`)
      .then(res => {
        return res.data;
      });
    const payload = {
      ...res.bookInfo,
      guideId: res.guide.guideId,
      tourName: res.tourName,
      tripDate: res.tripDate,
      _type: res._type,
      tripId: res.tripId,
      tourId: res.tourId,
      uploadedFileDate: res.paidDate,
      slip: res.slipImages
    };
    return payload;
  } catch (e) {
    console.log(e);
  }
}

export const SELECT_BOOKED_TRIP = 'SELECT_BOOKED_TRIP';
export function selectBookedTrip(tripId) {
  return async dispatch => {
    try {
      const payload = await getTrip(tripId);
      return dispatch({
        type: SELECT_BOOKED_TRIP,
        payload
      });
    } catch (e) {
      console.log(e);
    }
  };
}

export const SET_IMAGE_SLIP = 'SET_IMAGE_SLIP';
export function setImageSlip(slipUrl, tripId, tourId, customerId) {
  return async dispatch => {
    try {
      if (tripId) {
        const res = await axios
          .post('http://localhost:3000/customer/uploadPayment', {
            tourId,
            tripId,
            customerId,
            slipUrl
          })
          .then(res => {
            console.log(res.data);
            return res.data;
          });
        return dispatch({
          type: SET_IMAGE_SLIP,
          payload: {
            uploadedFileDate: res.paidDate,
            _type: res._type,
            slip: res.slipImages
          }
        });
      } else {
        return dispatch({ type: 'INVALID' });
      }
    } catch (e) {}
  };
}

export const SEE_BOOK_HISTORY = 'SEE_BOOK_HISTORY';
export function seeBookHistory(customerId) {
  return async dispatch => {
    try {
      if (customerId) {
        const tour = await axios
          .post('http://localhost:3000/customer/seeBookHistory', { customerId })
          .then(res => {
            return res.data;
          });
        return dispatch({
          type: SEE_BOOK_HISTORY,
          payload: tour
        });
      } else {
        return dispatch({ type: 'INVALID' });
      }
    } catch (e) {}
  };
}
