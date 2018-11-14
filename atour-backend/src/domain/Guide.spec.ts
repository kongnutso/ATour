import * as GuideDomain from './Guide';
import {
  Guide,
  ApprovalStatus,
  Tour,
  GuideType,
  ApprovedGuide,
  UnApprovedGuide,
  UserProfile
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
      'SCB',
      'Male'
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
        birthDate: new Date('1996-05-07'),
        gender: 'Male'
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
        phoneNumber: '0871234567',
        gender: 'Male'
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
      trips: [],
      guideId: 'guideid'
    };
    const resultGuide = GuideDomain.addPublishedTour()(guide, tour);
    const expectedGuide: Guide = {
      ...guide,
      publishedTours: [tour]
    };
    expect(resultGuide).toEqual(expectedGuide);
  });
  describe('updatePublishedTour', () => {
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
        phoneNumber: '0871234567',
        gender: 'Male'
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
      trips: [],
      guideId: 'guideid'
    };
    test('if no published Tour to update, do nothing', () => {
      const testGuide = guide;
      const resultGuide = GuideDomain.editPublishedTour()(testGuide, tour);
      const expectedGuide = testGuide;
      expect(resultGuide).toEqual(expectedGuide);
    });
    test('if have published Tour to update, update it', () => {
      const testGuide: ApprovedGuide = {
        ...guide,
        publishedTours: [tour]
      };
      const updatedTour: Tour = {
        ...tour,
        // update detail
        detail: 'tour to Changmai zoo',
        // update price
        price: 8000
      };
      const resultGuide = GuideDomain.editPublishedTour()(
        testGuide,
        updatedTour
      );
      const expectedGuide: ApprovedGuide = {
        ...testGuide,
        publishedTours: [updatedTour]
      };
      expect(resultGuide).toEqual(expectedGuide);
    });
  });
  test('edit Guide profile', () => {
    const guide: Guide = {
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
        birthDate: new Date('1996-05-07'),
        gender: 'Male'
      },
      bankAccountNumber: '102943940',
      bankName: 'SCB',
      approvalStatus: ApprovalStatus.NotApprove
    };
    const newProfile: UserProfile = {
      firstName: 'newname',
      lastName: 'newlast',
      gender: 'Female',
      birthDate: new Date('1996-05-08'),
      phoneNumber: '0849386844'
    };
    const editedGuide = GuideDomain.editGuide()(guide, newProfile);
    expect(editedGuide).toEqual({
      ...guide,
      profile: newProfile
    });
  });
});
