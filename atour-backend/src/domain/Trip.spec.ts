import { UnbookedTrip, BookedTrip, TripType } from './types';
import * as Trip from './Trip';

describe('Trip', () => {
  test('book', () => {
    const unbookedTrip: UnbookedTrip = {
      _type: TripType.UnbookedTrip,
      tripId: '1234',
      tripDate: new Date('2018-11-05'),
      tourId: 'tourId'
    };
    const bookedTrip = Trip.bookTrip()(
      unbookedTrip,
      'customer1',
      new Date('2018-10-05'),
      5,
      5000
    );
    const expectedBookedTrip: BookedTrip = {
      _type: TripType.BookedTrip,
      tripId: '1234',
      tripDate: new Date('2018-11-05'),
      bookInfo: {
        customerId: 'customer1',
        bookDate: new Date('2018-10-05'),
        size: 5,
        price: 5000
      },
      tourId: 'tourId'
    };
    expect(bookedTrip).toEqual(expectedBookedTrip);
  });
});
