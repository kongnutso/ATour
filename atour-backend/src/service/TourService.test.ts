import {
  publishTourService,
  addTripService,
  deleteTripService,
  editTourService,
  getTripService
} from './TourService';
import {
  ApprovalStatus,
  GuideType,
  Tour,
  Guide,
  TripType,
  UnbookedTrip,
  ApprovedGuide,
  UnApprovedGuide
} from '../domain/types';
import { GetGuideDb } from '../repository/Guide';
import { TripDto } from './dtoTypes';

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
      gender: 'Male',
      profileImageUrl: null
    },
    bankAccountNumber: '12345',
    bankName: 'SCB',
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

  const expectedGuide: Guide = {
    ...guide
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

test('editTour', () => {
  const tour: Tour = {
    tourId: 'tourId',
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
  const expectedTour = {
    tourId: 'tourId',
    tourName: 'Changmai Trip',
    minimumSize: 1,
    maximumSize: 2,
    price: 3000,
    detail: 'trip to Changmai',
    reviews: [],
    trips: [],
    guideId: 'guideid',
    imageUrl: 'google.com'
  };
  const fakeGetTour = async tourId => {
    expect(tourId).toEqual('tourId');
    return tour;
  };
  const fakeSaveTour = async tour => {
    expect(tour).toEqual(expectedTour);
  };
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
      gender: 'Male',
      profileImageUrl: null
    },
    bankAccountNumber: '12345',
    bankName: 'SCB',
    availableDate: [],
    dealtTrips: []
  };
  const expectedGuide: ApprovedGuide = {
    ...guide
  };
  const fakeGetGuide = async guideId => {
    expect(guideId).toEqual('guideid');
    return guide;
  };
  const fakeSaveGuide = async guide => {
    expect(guide).toEqual(expectedGuide);
  };
  editTourService(fakeGetTour, fakeGetGuide, fakeSaveTour, fakeSaveGuide)(
    'tourId',
    undefined,
    undefined,
    undefined,
    3000,
    undefined,
    'google.com'
  );
});

test('addTripService', async () => {
  const tour: Tour = {
    tourId: 'tourId',
    tourName: 'Changmai Trip',
    minimumSize: 1,
    maximumSize: 2,
    price: 5000,
    detail: 'trip to Changmai',
    reviews: [],
    trips: [],
    guideId: 'guideId',
    imageUrl: null
  };
  const addedTrip: UnbookedTrip = {
    _type: TripType.UnbookedTrip,
    tripId: 'tripId',
    tripDate: new Date('2018-11-05'),
    tourId: 'tourId',
    tourName: 'Changmai Trip'
  };
  const expectedTour: Tour = {
    tourId: 'tourId',
    tourName: 'Changmai Trip',
    minimumSize: 1,
    maximumSize: 2,
    price: 5000,
    detail: 'trip to Changmai',
    reviews: [],
    trips: [addedTrip],
    guideId: 'guideId',
    imageUrl: null
  };
  const fakeGetTour = async tourId => {
    expect(tourId).toEqual('tourId');
    return tour;
  };
  const fakeSaveTour = async tour => {
    expect(tour).toEqual(expectedTour);
  };
  const fakeSaveTrip = async trip => {
    expect(trip).toEqual(addedTrip);
  };
  const resultTour = await addTripService(
    fakeGetTour,
    fakeSaveTour,
    fakeSaveTrip,
    () => 'tripId'
  )('tourId', '2018-11-05');
  expect(resultTour).toEqual(expectedTour);
});

test('deleteTripService', async () => {
  const trip: UnbookedTrip = {
    _type: TripType.UnbookedTrip,
    tripId: 'tripId',
    tripDate: new Date('2018-11-05'),
    tourId: 'tourId',
    tourName: 'Changmai Trip'
  };
  const tour: Tour = {
    tourId: 'tourId',
    tourName: 'Changmai Trip',
    minimumSize: 1,
    maximumSize: 2,
    price: 5000,
    detail: 'trip to Changmai',
    reviews: [],
    trips: [trip],
    guideId: 'guideId',
    imageUrl: null
  };
  const expectedTour: Tour = {
    tourId: 'tourId',
    tourName: 'Changmai Trip',
    minimumSize: 1,
    maximumSize: 2,
    price: 5000,
    detail: 'trip to Changmai',
    reviews: [],
    trips: [],
    guideId: 'guideId',
    imageUrl: null
  };
  const fakeGetTour = async tourId => {
    expect(tourId).toEqual('tourId');
    return tour;
  };
  const fakeSaveTour = async tour => {
    expect(tour).toEqual(expectedTour);
  };
  const fakeDeleteTrip = async tripId => {
    expect(tripId).toEqual('tripId');
  };

  const resultTour = await deleteTripService(
    fakeGetTour,
    fakeSaveTour,
    fakeDeleteTrip
  )('tourId', 'tripId');
  expect(resultTour).toEqual(expectedTour);
});

test('getTripService', async () => {
  const trip: UnbookedTrip = {
    _type: TripType.UnbookedTrip,
    tripId: 'tripId',
    tripDate: new Date('2018-11-05'),
    tourId: 'tourId',
    tourName: 'Changmai Trip'
  };
  const tour: Tour = {
    tourId: 'tourId',
    tourName: 'Changmai Trip',
    minimumSize: 1,
    maximumSize: 2,
    price: 5000,
    detail: 'trip to Changmai',
    reviews: [],
    trips: [trip],
    guideId: 'guideId',
    imageUrl: null
  };
  const guide: UnApprovedGuide = {
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
  const fakeGetTrip = async tripId => {
    expect(tripId).toEqual('tripId');
    return trip;
  };
  const fakeGetTour = async tourId => {
    expect(tourId).toEqual('tourId');
    return tour;
  };
  const fakeGetGuide = async guideId => {
    expect(guideId).toEqual('guideId');
    return guide;
  };
  const tripDto: TripDto = await getTripService(
    fakeGetTrip,
    fakeGetTour,
    fakeGetGuide
  )('tripId');
  expect(tripDto).toEqual({
    ...trip,
    tour,
    guide
  });
});
