import { UnbookedTrip, BookedTrip } from './types';

type BookTrip = (
  trip: UnbookedTrip,
  customerId: string,
  bookDate: Date
) => BookedTrip;

export function bookTrip(): BookTrip {
  return (
    trip: UnbookedTrip,
    customerId: string,
    bookDate: Date
  ): BookedTrip => {
    const { tripId, tripDate } = trip;
    return { tripId, tripDate, bookInfo: { bookDate, customerId } };
  };
}
