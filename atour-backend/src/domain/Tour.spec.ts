import * as TourDomain from './Tour';
import { Tour } from './types';

describe('Tour', () => {
  test('create Tour', () => {
    const tour = TourDomain.createTour(() => 'tourId')(
      'Changmai',
      1,
      5,
      3500,
      'trip to Changmai'
    );
    const expectedTour: Tour = {
      tourId: 'tourId',
      tourName: 'Changmai',
      minimumSize: 1,
      maximumSize: 5,
      price: 3500,
      detail: 'trip to Changmai',
      reviews: [],
      trips: []
    };
    expect(tour).toEqual(expectedTour);
  });

  test('publish Trip', () => {
    const tour: Tour = {
      tourId: 'tourId',
      tourName: 'Changmai',
      minimumSize: 1,
      maximumSize: 5,
      price: 3500,
      detail: 'trip to Changmai',
      trips: [],
      reviews: []
    };
    const tourWithTrip = TourDomain.publishTrip(() => 'newidkrub')(
      tour,
      new Date('2018-11-04')
    );
    const expectedTour = {
      tourId: 'tourId',
      tourName: 'Changmai',
      minimumSize: 1,
      maximumSize: 5,
      price: 3500,
      detail: 'trip to Changmai',
      trips: [
        {
          tripId: 'newidkrub',
          tripDate: new Date('2018-11-04')
        }
      ],
      reviews: []
    };
    expect(tourWithTrip).toEqual(expectedTour);
  });
});
