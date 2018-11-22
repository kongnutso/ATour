import { UnbookedTrip, BookedTrip, TripType } from './types';

type BookTrip = (
  trip: UnbookedTrip,
  customerId: string,
  bookDate: Date,
  size: number,
  price: number
) => BookedTrip;

export function bookTrip(): BookTrip {
  return (
    trip: UnbookedTrip,
    customerId: string,
    bookDate: Date,
    size: number,
    price: number
  ): BookedTrip => {
    const { tripId, tripDate, tourId, tourName } = trip;
    return {
      _type: TripType.BookedTrip,
      tripId,
      tripDate,
      bookInfo: { bookDate, customerId, size, price },
      tourId,
      tourName,
    };
  };
}
