export const BOOK_TRIP = 'BOOK_TRIP';
export function bookTrip(tourInfo, date, size) {
  const dates = new Date();
  const dd = dates.getDate();
  const mm = dates.getMonth() + 1;
  const yyyy = dates.getFullYear();
  const today = mm + '/' + dd + '/' + yyyy;
  return {
    type: BOOK_TRIP,
    payload: { tourInfo, date, size, today }
  };
}

export const SELECT_BOOKED_TRIP = 'SELECT_BOOKED_TRIP';
export function selectBookedTrip(trip) {
  return { type: SELECT_BOOKED_TRIP, payload: trip };
}
