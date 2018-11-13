import { publishTourService } from './TourService';
import { ApprovalStatus, GuideType, Tour, Guide } from '../domain/types';
import { GetGuideDb } from '../repository/Guide';

test('createTour', () => {
  const guide: Guide = {
    _type: GuideType.ApprovedGuide,
    guideId: 'guideid',
    approvalStatus: ApprovalStatus.Approved,
    userName: 'john',
    password: 'password',
    email: 'guide@gmail.com',
    personalId: '1234567890123',
    profile: {
      firstName: 'John',
      lastName: 'Smith',
      birthDate: new Date('1996-05-07'),
      phoneNumber: '0871234567',
      gender: 'Male'
    },
    bankAccountNumber: '12345',
    bankName: 'SCB',
    availableDate: [],
    dealtTrips: [],
    publishedTours: []
  };

  const expectedTour: Tour = {
    tourId: 'uuid',
    tourName: 'Changmai Trip',
    minimumSize: 1,
    maximumSize: 2,
    price: 5000,
    detail: 'trip to Changmai',
    reviews: [],
    trips: [],
    guideId: 'guideid'
  };

  const expectedGuide: Guide = {
    ...guide,
    publishedTours: [expectedTour]
  };

  const fakeGetGuide: GetGuideDb = async guideId => guide;
  const fakeSaveTour = async tour => {
    expect(tour).toEqual(expectedTour);
    console.log(tour);
  };
  const fakeSaveGuide = async guide => {
    expect(guide).toEqual(expectedGuide);
    console.log(guide);
  };
  publishTourService(() => 'uuid', fakeGetGuide, fakeSaveTour, fakeSaveGuide)(
    'guideid',
    'Changmai Trip',
    1,
    2,
    5000,
    'trip to Changmai'
  );
});
