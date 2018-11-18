import * as TourDomain from './Tour';
import { Tour, TripType } from './types';

describe('Tour', () => {
  test('create Tour', () => {
    const tour = TourDomain.publishTour(() => 'tourId')(
      'Changmai',
      1,
      5,
      3500,
      'trip to Changmai',
      'guideid',
    );
    const expectedTour: Tour = {
      tourId: 'tourId',
      tourName: 'Changmai',
      minimumSize: 1,
      maximumSize: 5,
      price: 3500,
      detail: 'trip to Changmai',
      reviews: [],
      trips: [],
      guideId: 'guideid'
    };
    expect(tour).toEqual(expectedTour);
  });

  test('edit Tour', () => {
    const editedTour = TourDomain.editTour()(
      {
        tourId: 'tourId',
        tourName: 'Changmai',
        minimumSize: 1,
        maximumSize: 5,
        price: 3500,
        detail: 'trip to Changmai',
        reviews: [],
        trips: [],
        guideId: 'guideid'
      },
      {
        tourName: 'Changmai trip',
        price: 5000
      }
    );
    const expectedTour: Tour = {
      tourId: 'tourId',
      tourName: 'Changmai trip',
      minimumSize: 1,
      maximumSize: 5,
      price: 5000,
      detail: 'trip to Changmai',
      reviews: [],
      trips: [],
      guideId: 'guideid'
    };
    expect(editedTour).toEqual(expectedTour);
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
      reviews: [],
      guideId: 'guideid'
    };
    const tourWithTrip = TourDomain.addTrip(() => 'newidkrub')(
      tour,
      new Date('2018-11-04')
    );
    const expectedTour: Tour = {
      tourId: 'tourId',
      tourName: 'Changmai',
      minimumSize: 1,
      maximumSize: 5,
      price: 3500,
      detail: 'trip to Changmai',
      trips: [
        {
          _type: TripType.UnbookedTrip,
          tripId: 'newidkrub',
          tripDate: new Date('2018-11-04')
        }
      ],
      reviews: [],
      guideId: 'guideid'
    };
    expect(tourWithTrip).toEqual(expectedTour);
  });
});
