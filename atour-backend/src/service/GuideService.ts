import {
  SaveGuideDb,
  CheckGuideUserNameDuplicate,
  SaveGuideTokenDb,
  GetGuideForLogin,
  GetTokenForGuide,
  GetGuideDb,
  GetPublishedToursOfGuide,
  GetDealtTrip
} from '../repository/Guide';
import { registerGuide, editGuide } from '../domain/Guide';
import { Guide, Gender, UserProfile, GuideType,  TripType } from '../domain/types';
import { IdGenerator } from '../domain/Tour';
import { GuideDto, DealtTripDto } from './dtoTypes';
import { GetCustomerDb } from 'repository/Customer';

export type RegisterGuideService = (
  userName: string,
  password: string,
  personalId: string,
  email: string,
  firstName: string,
  lastName: string,
  phoneNumber: string,
  birthDate: Date,
  bankAccountNumber: string,
  bankName: string,
  gender: Gender
) => Promise<Guide>;

export type LoginGuideService = (
  userName: string,
  password: string
) => Promise<{ token: string; guide: Guide }>;

export type EditGuideService = (
  guideId: string,
  guideProfile: UserProfile,
  email: string
) => Promise<Guide>;

export type GetGuideService = (guideId: string) => Promise<GuideDto>;

export function registerGuideService(
  idGenerator: IdGenerator,
  checkGuideUserNameDuplicate: CheckGuideUserNameDuplicate,
  saveGuide: SaveGuideDb,
  saveToken: SaveGuideTokenDb
): RegisterGuideService {
  return async (
    userName: string,
    password: string,
    personalId: string,
    email: string,
    firstName: string,
    lastName: string,
    phoneNumber: string,
    birthDate: Date,
    bankAccountNumber: string,
    bankName: string,
    gender: Gender
  ) => {
    if (await checkGuideUserNameDuplicate(userName)) {
      throw new Error('Guide username is duplicated');
    }
    const guide = registerGuide(idGenerator)(
      userName,
      password,
      personalId,
      email,
      firstName,
      lastName,
      phoneNumber,
      birthDate,
      bankAccountNumber,
      bankName,
      gender
    );
    await saveGuide(guide);
    await saveToken(guide.guideId, idGenerator());
    return guide;
  };
}

export function loginGuideService(
  getGuideForLogin: GetGuideForLogin,
  getTokenForGuide: GetTokenForGuide
): LoginGuideService {
  return async (userName, password) => {
    const guide = await getGuideForLogin(userName, password);
    const token = await getTokenForGuide(guide.guideId);
    return { guide, token };
  };
}

export function editGuideService(
  getGuide: GetGuideDb,
  saveGuide: SaveGuideDb
): EditGuideService {
  return async (guideId, guideProfile, email) => {
    const guide = await getGuide(guideId);
    const editedGuide = editGuide()(guide, guideProfile, email);
    await saveGuide(editedGuide);
    return editedGuide;
  };
}

export function getGuideService(
  getGuide: GetGuideDb,
  getPublishedTourOfGuide: GetPublishedToursOfGuide,
  getDealtTrip: GetDealtTrip,
  getCustomer: GetCustomerDb
): GetGuideService {
  return async guideId => {
    const guide = await getGuide(guideId);
    switch (guide._type) {
      case GuideType.UnApprovedGuide: {
        const guideDto: GuideDto = guide;
        return guideDto;
      }
      default: {
        const publishedTours = await getPublishedTourOfGuide(guideId);
        const dealtTrips = await getDealtTrip(guideId);
        let dealtTripsDto: DealtTripDto[] = [];
        for(let i=0; i < dealtTrips.length; i++){
          const trip = dealtTrips[i];
          if (trip._type === TripType.ApprovedTrip) {
            const customerId = trip.bookInfo.customerId
            const customer = await getCustomer(customerId);
            const dealtTripDto: DealtTripDto = { ...trip, customer };
            dealtTripsDto = [...dealtTripsDto, dealtTripDto];
          } else {
            throw new Error('dealtTrip error');
          }
        }
        const guideDto: GuideDto = { 
          ...guide,
          publishedTours,
          dealtTrips: dealtTrips,
          dealtTripsDto: dealtTripsDto };
        return guideDto;
      }
    }
  };
}

