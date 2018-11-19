import axios from 'axios';

export const BOOK_TRIP = 'BOOK_TRIP';
export function bookTrip(tourInfo, date, size, guideName) {
  console.log(guideName);
  const dates = new Date();
  const dd = dates.getDate();
  const mm = dates.getMonth() + 1;
  const yyyy = dates.getFullYear();
  const today = mm + '/' + dd + '/' + yyyy;
  const bookedId = Math.floor(Math.random() * 10000);
  return {
    type: BOOK_TRIP,
    payload: { tourInfo, date, size, today, guideName, bookedId }
  };
}

export const SELECT_BOOKED_TRIP = 'SELECT_BOOKED_TRIP';
export function selectBookedTrip(trip) {
  return { type: SELECT_BOOKED_TRIP, payload: trip };
}

export const SET_IMAGE_SLIP = 'SET_IMAGE_SLIP';
export function setImageSlip(url, bookedId, tourId, customerId) {
  const dates = new Date();
  const dd = dates.getDate();
  const mm = dates.getMonth() + 1;
  const yyyy = dates.getFullYear();
  const today = mm + '/' + dd + '/' + yyyy;
  return async dispatch => {
    try {
      if (bookedId) {
        const slip = await axios
          .post('http://localhost:3000/customer/uploadPayment', {
            tourId,
            bookedId,
            customerId,
            url
          })
          .then(res => {
            //sth
            return res.data;
          });
        return dispatch({
          type: SET_IMAGE_SLIP,
          payload: { url, bookedId, today }
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
          .post('http://localhost:3000/customer/seeBookHistory', customerId)
          .then(res => {
            console.log(res);
            return res.data.trips;
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
