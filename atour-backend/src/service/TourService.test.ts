import { publishTourService } from './TourService';
import { ApprovalStatus, GuideType } from '../domain/types';
import { GetGuideDb } from '../repository/Guide';

test('createTour', () => {
  //TODO: properly check this
  const fakeGetGuide: GetGuideDb = async guideId => ({
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
      phoneNumber: '0871234567'
    },
    bankAccountNumber: '12345',
    bankName: 'SCB',
    availableDate: [],
    dealtTrips: [],
    publishedTours: []
  });
  const fakeSaveTour = async tour => console.log(tour);
  const fakeSaveGuide = async guide => console.log(guide);
  publishTourService(fakeGetGuide, fakeSaveTour, fakeSaveGuide)(
    'guideid',
    'Changmai Trip',
    1,
    2,
    5000,
    'trip to Changmai'
  );
});
