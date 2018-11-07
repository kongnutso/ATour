import { UnbookedTrip, BookedTrip } from './types';

export function book(
  trip: UnbookedTrip,
  customerId: string,
  bookDate: Date
): BookedTrip {
  const { tripId, tripDate } = trip;
  return { tripId, tripDate, bookInfo: { bookDate, customerId } };
}
