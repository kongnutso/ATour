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
        console.log(tourId, bookedId, customerId, url);
        const slip = await axios
          .post('http://localhost:3000/customer/uploadPayment', {
            tourId,
            tripId: bookedId,
            customerId,
            slipUrl: url
          })
          .then(res => {
            console.log(res.data);
            return res.data;
          });
        return dispatch({
          type: SET_IMAGE_SLIP,
          payload: { url, bookedId, today, _type: 2 }
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

export const CANCEL_TRIP = 'CANCEL_TRIP';
export function cancelTrip(tourId, tripId, customerId) {
  return async dispatch => {
    try {
      if (customerId) {
        console.log(tourId, tripId, customerId);
        const cancel = await axios
          .post('http://localhost:3000/customer/cancelTrip', {
            tourId: tourId,
            tripId: tripId,
            customerId: customerId
          })
          .then(res => {
            console.log('cancel', res.data);
            return res.data;
          });
        return dispatch({
          type: CANCEL_TRIP,
          payload: cancel
        });
      } else {
        return dispatch({ type: 'INVALID' });
      }
    } catch (e) {}
  };
}

export const REFUND_TRIP = 'REFUND_TRIP';
export function refundTrip(tourId, tripId, customerId) {
  return async dispatch => {
    try {
      if (customerId) {
        console.log(tourId, tripId, customerId);
        const refund = await axios
          .post('http://localhost:3000/customer/refundTrip', {
            tourId: tourId,
            tripId: tripId,
            customerId: customerId
          })
          .then(res => {
            console.log('refund', res.data);
            return res.data;
          });
        return dispatch({
          type: REFUND_TRIP,
          payload: refund
        });
      } else {
        return dispatch({ type: 'INVALID' });
      }
    } catch (e) {}
  };
}
