import { UnbookedTrip, BookedTrip } from './types';
import * as Trip from './Trip';

describe('Trip', () => {
  test('book', () => {
    const unbookedTrip: UnbookedTrip = {
      tripId: '1234',
      tripDate: new Date('2018-11-05')
    };
    const bookedTrip = Trip.bookTrip()(
      unbookedTrip,
      'customer1',
      new Date('2018-10-05')
    );
    const expectedBookedTrip: BookedTrip = {
      tripId: '1234',
      tripDate: new Date('2018-11-05'),
      bookInfo: {
        customerId: 'customer1',
        bookDate: new Date('2018-10-05')
      }
    };
    expect(bookedTrip).toEqual(expectedBookedTrip);
  });
});
