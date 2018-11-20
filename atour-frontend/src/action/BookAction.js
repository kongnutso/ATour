import axios from 'axios';

export const BOOK_TRIP = 'BOOK_TRIP';
export function bookTrip(
  tourName,
  tourId,
  tripInfo,
  price,
  size,
  customerId,
  guideName
) {
  /*  tourId,
            tripId,
            tripDate,
            customerId,
            size,
            price*/
  console.log(tourId, tripInfo, price, size, customerId, guideName);
  return async dispatch => {
    try {
      const payload = {
        tourName: tourName,
        tourId: tourId,
        tripId: tripInfo.tripId,
        tripDate: tripInfo.tripDate,
        customerId,
        size,
        price,
        guideName
      };
      const res = await axios
        .post('http://localhost:3000/customer/bookTrip', payload)
        .then(res => {
          return res.data;
        });
      console.log(res);
      console.log(payload);
      return dispatch({
        type: BOOK_TRIP,
        res
      });
    } catch (e) {
      console.log(e);
    }
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
        console.log(url, bookedId, tourId, customerId);
        const slip = await axios
          .post('http://localhost:3000/customer/uploadPayment', {
            tourId,
            bookedId,
            customerId,
            url
          })
          .then(res => {
            console.log(res);
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
          .post('http://localhost:3000/customer/seeBookHistory', { customerId })
          .then(res => {
            console.log('aaa', res.data);
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
