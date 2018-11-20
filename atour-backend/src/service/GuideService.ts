import {
  SaveGuideDb,
  CheckGuideUserNameDuplicate,
  SaveGuideTokenDb,
  GetGuideForLogin,
  GetTokenForGuide,
  GetGuideDb
} from '../repository/Guide';
import { registerGuide, editGuide } from '../domain/Guide';
import { Guide, Gender, UserProfile } from 'domain/types';
import { IdGenerator } from 'domain/Tour';

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
  guideProfile: UserProfile
) => Promise<Guide>;

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
  return async (guideId, guideProfile) => {
    const guide = await getGuide(guideId);
    const editedGuide = editGuide()(guide, guideProfile);
    await saveGuide(editedGuide);
    return editedGuide;
  };
}
