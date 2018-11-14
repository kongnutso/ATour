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
