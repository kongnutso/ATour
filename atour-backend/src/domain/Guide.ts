import {
  Tour,
  Guide,
  GuideType,
  UnApprovedGuide,
  ApprovalStatus,
  Gender,
  UserProfile,
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
  bankName: string,
  gender: Gender
) => UnApprovedGuide;

type AddPublishedTour = (c: Guide, t: Tour) => Guide;

type EditPublishedTour = (c: Guide, editedTour: Tour) => Guide;

type EditGuide = (g: Guide, p: UserProfile, email: string) => Guide;


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
    bankName,
    gender
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
        phoneNumber,
        gender,
        profileImageUrl: null
      },
      approvalStatus: ApprovalStatus.NotApprove
    };
    return guide;
  };
}

export function addPublishedTour(): AddPublishedTour {
  return (guide: Guide, tour: Tour) => {
    switch (guide._type) {
      case GuideType.ApprovedGuide: {
        return {
          ...guide
        };
      }
      default: {
        throw new Error('Guide must be approved to publish tour');
      }
    }
  };
}

export function editPublishedTour(): EditPublishedTour {
  return (guide, toBeTour) => {
    switch (guide._type) {
      case GuideType.ApprovedGuide: {
        return guide;
      }
      default: {
        throw new Error('Guide must be approved to update published tour');
      }
    }
  };
}

export function editGuide(): EditGuide {
  return (guide, profile, email) => {
    return {
      ...guide,
      profile,
      email
    };
  };
}

