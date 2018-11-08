import * as GuideDomain from './Guide';
import {
  Guide,
  ApprovalStatus,
  Tour,
  GuideType,
  ApprovedGuide,
  UnApprovedGuide
} from './types';

describe('Guide', () => {
  test('registerGuide', () => {
    const resultGuide = GuideDomain.registerGuide(() => 'guideid')(
      'guideuser',
      'password',
      '1234567890123',
      'guide@gmail.com',
      'John',
      'Smith',
      '0812345678',
      new Date('1996-05-07'),
      '102943940',
      'SCB'
    );
    const expectedGuide: UnApprovedGuide = {
      _type: GuideType.UnApprovedGuide,
      guideId: 'guideid',
      userName: 'guideuser',
      password: 'password',
      personalId: '1234567890123',
      email: 'guide@gmail.com',
      profile: {
        firstName: 'John',
        lastName: 'Smith',
        phoneNumber: '0812345678',
        birthDate: new Date('1996-05-07')
      },
      bankAccountNumber: '102943940',
      bankName: 'SCB',
      approvalStatus: ApprovalStatus.NotApprove
    };
    expect(resultGuide).toEqual(expectedGuide);
  });
  test('addPublishedTour', () => {
    const guide: ApprovedGuide = {
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
    };
    const tour: Tour = {
      tourId: 'tourid',
      tourName: 'Changmai trip',
      detail: 'tour to Changmai',
      minimumSize: 1,
      maximumSize: 2,
      price: 3000,
      reviews: [],
      trips: []
    };
    const resultGuide = GuideDomain.addPublishTour()(guide, tour);
    const expectedGuide: Guide = {
      ...guide,
      publishedTours: [tour]
    };
    expect(resultGuide).toEqual(expectedGuide);
  });
});
