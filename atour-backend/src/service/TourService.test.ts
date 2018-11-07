import { createTourService } from './TourService';

test('createTour', () => {
  createTourService(async tour => console.log(tour))(
    'Changmai Trip',
    1,
    2,
    5000,
    'trip to Changmai'
  );
});
