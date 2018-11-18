import * as AdminService from './AdminService';
import { 
  Guide,
  GuideType,
  ApprovalStatus,
  Customer,
  Tour,
  PaidTrip,
  TripType
} from '../domain/types';
import { GetGuideDb, SaveGuideDb } from '../repository/Guide';


describe('AdminService', () => {
  test('ApproveGuideService', async () => {
    const unapprovedGuide: Guide = {
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
        gender: 'Male'
      },
      approvalStatus: ApprovalStatus.NotApprove
    };
    const approvedGuide: Guide = {
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
        gender: 'Male'
      },
      approvalStatus: ApprovalStatus.Approved,
      availableDate: [],
      dealtTrips: [],
      publishedTours: []
    };
    const fakeGetGuide: GetGuideDb = async guideId => {
      expect(guideId).toEqual('guideId');
      return unapprovedGuide;
    };
    const fakeSaveGuide: SaveGuideDb = async savedGuide => {
      expect(savedGuide).toEqual(approvedGuide);
    };
    const approvedResult = await AdminService.approveGuideService(
      fakeGetGuide,
      fakeSaveGuide
    )('guideId');
    expect(approvedResult).toEqual(approvedGuide);
  });

  test('MarkBadGuideService', async () => {
    const shittyGuide: Guide = {
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
        gender: 'Male'
      },
      approvalStatus: ApprovalStatus.Approved,
      availableDate: [],
      dealtTrips: [],
      publishedTours: []
    };
    const markedGuide: Guide = {
      _type: GuideType.BadGuide,
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
        gender: 'Male'
      },
      approvalStatus: ApprovalStatus.Approved,
      availableDate: [],
      dealtTrips: [],
      publishedTours: []
    };
    const fakeGetGuide: GetGuideDb = async guideId => {
      expect(guideId).toEqual('guideId');
      return shittyGuide;
    };
    const fakeSaveGuide: SaveGuideDb = async savedGuide => {
      expect(savedGuide).toEqual(markedGuide);
    };
    const markResult = await AdminService.markBadGuideService(
      fakeGetGuide,
      fakeSaveGuide
    )('guideId');
    expect(markResult).toEqual(markedGuide);
  })

  // test('ApprovePaymentService', async () => {
  //   const customer: Customer = {
  //     customerId: 'customerid',
  //     userName: 'customerUser',
  //     password: 'password',
  //     email: 'customer@test.com',
  //     personalId: '1234567890123',
  //     profile: {
  //         firstName: 'Customername',
  //         lastName: 'Clastname',
  //         birthDate: new Date('1997-05-07'),
  //         phoneNumber: '0811111111',
  //         gender: 'Female'
  //     },
  //     tripHistory: [],
  //   };
  // const tour: Tour = {
  //     tourId: 'tourId',
  //     tourName: 'Changmai',
  //     minimumSize: 1,
  //     maximumSize: 5,
  //     price: 3500,
  //     detail: 'trip to Changmai',
  //     reviews: [],
  //     trips: [],
  //     guideId: 'guideid'
  //   };
  //   const paidTrip: PaidTrip = {
  //     _type: TripType.PaidTrip,
  //     tripId: 'tripId',
  //     tripDate: new Date("2018-11-11"),
  //     bookInfo: {
  //         bookDate: new Date("2018-11-05"),
  //         customerId: 'customerId',
  //         size: 5,
  //         price: 5000
  //     },
  //     paidDate: new Date('2018-11-05'),
  //     slipImages: [{url: 'www.adm.co.th'}],
  //   }



  })
})