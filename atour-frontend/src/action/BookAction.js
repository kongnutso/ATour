import axios from 'axios';

export const BOOK_TRIP = 'BOOK_TRIP';
export function bookTrip(tourId, tripInfo, price, size, customerId) {
  /*  tourId,
            tripId,
            tripDate,
            customerId,
            size,
            price*/
  console.log(tourId, tripInfo, price, size, customerId);
  return async dispatch => {
    try {
      const payload = {
        tourId: tourId,
        tripId: tripInfo.tripId,
        tripDate: tripInfo.tripDate,
        customerId,
        size,
        price
      };
      const res = await axios
        .post('http://localhost:3000/customer/bookTrip', payload)
        .then(res => {
          return res.data;
        });
      console.log(res);
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
export function setImageSlip(url, bookedId) {
  const dates = new Date();
  const dd = dates.getDate();
  const mm = dates.getMonth() + 1;
  const yyyy = dates.getFullYear();
  const today = mm + '/' + dd + '/' + yyyy;
  return {
    type: SET_IMAGE_SLIP,
    payload: { url, bookedId, today }
  };
}
