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
  UserProfile
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
    )('guideId', newProfile);
    expect(editedGuide).toEqual({
      ...guide,
      profile: newProfile
    });
  });
});
