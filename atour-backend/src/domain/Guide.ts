import {
  Tour,
  Guide,
  GuideType,
  UnApprovedGuide,
  ApprovalStatus
} from './types';
import { IdGenerator } from './Tour';

type RegisterGuide = (
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
) => UnApprovedGuide;

type AddPublishedTour = (c: Guide, t: Tour) => Guide;

export function registerGuide(idGenerator: IdGenerator): RegisterGuide {
  return (
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
  ) => {
    const guide: UnApprovedGuide = {
      _type: GuideType.UnApprovedGuide,
      guideId: idGenerator(),
      userName,
      password,
      personalId,
      bankAccountNumber,
      bankName,
      email,
      profile: {
        firstName,
        lastName,
        birthDate,
        phoneNumber
      },
      approvalStatus: ApprovalStatus.NotApprove
    };
    return guide;
  };
}
export function addPublishTour(): AddPublishedTour {
  return (guide: Guide, tour: Tour) => {
    switch (guide._type) {
      case GuideType.ApprovedGuide: {
        const { publishedTours } = guide;
        const addedPublishedTours = [...publishedTours, tour];
        return {
          ...guide,
          publishedTours: addedPublishedTours
        };
      }
      default: {
        throw new Error('Guide must be approved to publish tour');
      }
    }
  };
}
