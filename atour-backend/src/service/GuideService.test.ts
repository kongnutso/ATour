import * as GuideService from './GuideService';
import {
  SaveGuideDb,
  SaveGuideTokenDb,
  CheckGuideUserNameDuplicate,
  GetGuideForLogin,
  GetTokenForGuide,
  GetGuideDb
} from '../repository/Guide';
import {
  UnApprovedGuide,
  GuideType,
  ApprovalStatus,
  Guide,
  UserProfile,
  Tour,
  ApprovedGuide
} from '../domain/types';
describe('GuideService', () => {
  test('registerGuide', async () => {
    const fakeCheckGuideUserNameDuplicated: CheckGuideUserNameDuplicate = async () =>
      false;
    const fakeSaveGuide: SaveGuideDb = async guide => {
      const expectedGuide: UnApprovedGuide = {
        _type: GuideType.UnApprovedGuide,
        userName: 'guideuser',
        password: 'password',
        personalId: '1234567890123',
        email: 'guide@gmail.com',
        profile: {
          firstName: 'John',
          lastName: 'Smith',
          phoneNumber: '0812345678',
          birthDate: new Date('1996-05-07'),
          gender: 'Male',
          profileImageUrl: null
        },
        bankAccountNumber: '102943940',
        bankName: 'SCB',
        approvalStatus: ApprovalStatus.NotApprove,
        guideId: 'guideid'
      };
      expect(guide).toEqual(expectedGuide);
    };
    const fakeSaveToken: SaveGuideTokenDb = async (guideId, token) => {
      expect(guideId).toEqual('guideid');
      expect(token).toEqual('guideid');
    };
    await GuideService.registerGuideService(
      () => 'guideid',
      fakeCheckGuideUserNameDuplicated,
      fakeSaveGuide,
      fakeSaveToken
    )(
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
  });
  test('loginGuide', async () => {
    const expectedGuide: Guide = {
      _type: GuideType.UnApprovedGuide,
      guideId: 'guideId',
      userName: 'guideusername',
      password: 'password',
      bankAccountNumber: '2134592',
      bankName: 'SCB',
      email: 'email@gmail.com',
      personalId: '1928483849283',
      profile: {
        firstName: 'first',
        lastName: 'last',
        birthDate: new Date(1234),
        phoneNumber: '0983746888',
        gender: 'Male',
        profileImageUrl: null
      },
      approvalStatus: ApprovalStatus.NotApprove
    };
    const fakeGetGuideForLogin: GetGuideForLogin = async (
      userName,
      password
    ) => {
      expect(userName).toEqual('guideusername');
      expect(password).toEqual('password');
      return expectedGuide;
    };
    const fakeGetTokenForGuide: GetTokenForGuide = async guideId => {
      expect(guideId).toEqual('guideId');
      return 'token';
    };
    const { token, guide } = await GuideService.loginGuideService(
      fakeGetGuideForLogin,
      fakeGetTokenForGuide
    )('guideusername', 'password');
    expect(token).toEqual('token');
    expect(guide).toEqual(expectedGuide);
  });

  test('editGuide profile', async () => {
    const guide: Guide = {
      _type: GuideType.UnApprovedGuide,
      guideId: 'guideId',
      userName: 'guideusername',
      password: 'password',
      bankAccountNumber: '2134592',
      bankName: 'SCB',
      email: 'email@gmail.com',
      personalId: '1928483849283',
      profile: {
        firstName: 'first',
        lastName: 'last',
        birthDate: new Date(1234),
        phoneNumber: '0983746888',
        gender: 'Male',
        profileImageUrl: null
      },
      approvalStatus: ApprovalStatus.NotApprove
    };
    const fakeGetGuide: GetGuideDb = async guideId => {
      expect(guideId).toEqual('guideId');
      return guide;
    };
    const newProfile: UserProfile = {
      firstName: 'newname',
      lastName: 'newlast',
      gender: 'Female',
      birthDate: new Date('1996-05-08'),
      phoneNumber: '0849386844',
      profileImageUrl: 'www.imgur.com'
    };
    const fakeSaveGuide: SaveGuideDb = async savedGuide => {
      expect(savedGuide).toEqual({
        ...guide,
        profile: newProfile
      });
    };
    const editedGuide = await GuideService.editGuideService(
      fakeGetGuide,
      fakeSaveGuide
    )('guideId', newProfile, 'newemail@gmail.com');
    expect(editedGuide).toEqual({
      ...guide,
      profile: newProfile,
      email: 'newemail@gmail.com'
    });
  });

  test('getUnApprovedGuide', () => {
    const guide: Guide = {
      _type: GuideType.UnApprovedGuide,
      guideId: 'guideId',
      userName: 'guideusername',
      password: 'password',
      bankAccountNumber: '2134592',
      bankName: 'SCB',
      email: 'email@gmail.com',
      personalId: '1928483849283',
      profile: {
        firstName: 'first',
        lastName: 'last',
        birthDate: new Date(1234),
        phoneNumber: '0983746888',
        gender: 'Male',
        profileImageUrl: null
      },
      approvalStatus: ApprovalStatus.NotApprove
    };
    const fakeGetGuide: GetGuideDb = async guideId => {
      expect(guideId).toEqual('guideId');
      return guide;
    };
    const fakeGetPublishedTourOfGuide = () => {
      throw new Error('This should not be called');
    };
    GuideService.getGuideService(fakeGetGuide, fakeGetPublishedTourOfGuide)(
      'guideId'
    );
  });

  test('getApprovedGuide', async () => {
    const guide: ApprovedGuide = {
      _type: GuideType.ApprovedGuide,
      guideId: 'guideId',
      userName: 'guideusername',
      password: 'password',
      bankAccountNumber: '2134592',
      bankName: 'SCB',
      email: 'email@gmail.com',
      personalId: '1928483849283',
      profile: {
        firstName: 'first',
        lastName: 'last',
        birthDate: new Date(1234),
        phoneNumber: '0983746888',
        gender: 'Male',
        profileImageUrl: null
      },
      approvalStatus: ApprovalStatus.Approved,
      availableDate: [],
      dealtTrips: []
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
      guideId: 'guideid',
      imageUrl: null
    };
    const fakeGetGuide: GetGuideDb = async guideId => {
      expect(guideId).toEqual('guideId');
      return guide;
    };
    const fakeGetPublishedTourOfGuide = async guideId => {
      expect(guideId).toEqual('guideId');
      return [expectedTour];
    };
    const guideDto = await GuideService.getGuideService(
      fakeGetGuide,
      fakeGetPublishedTourOfGuide
    )('guideId');
    expect(guideDto).toEqual({
      ...guide,
      publishedTours: [expectedTour]
    });
  });
});
