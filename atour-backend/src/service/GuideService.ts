import * as uuid from 'uuid/v4';
import { SaveGuideDb } from '../repository/Guide';
import { registerGuide } from '../domain/Guide';

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
  bankName: string
) => Promise<void>;

export type CheckGuideUserNameDuplicate = (
  guideUserName: string
) => Promise<boolean>;

export function registerGuideService(
  checkGuideUserNameDuplicate: CheckGuideUserNameDuplicate,
  saveGuide: SaveGuideDb
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
    bankName: string
  ) => {
    if (await checkGuideUserNameDuplicate(userName)) {
      throw new Error('Guide username is duplicated');
    }
    const guide = registerGuide(() => uuid())(
      userName,
      password,
      personalId,
      email,
      firstName,
      lastName,
      phoneNumber,
      birthDate,
      bankAccountNumber,
      bankName
    );
    await saveGuide(guide);
  };
}
