import { List } from 'immutable';
import {
  Tour,
  Guide,
  GuideType,
  UnApprovedGuide,
  ApprovalStatus,
<<<<<<< HEAD
  Gender
=======
  Gender,
  UserProfile
>>>>>>> origin/master
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

type EditGuide = (g: Guide, p: UserProfile) => Guide;

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
        gender
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

export function editPublishedTour(): EditPublishedTour {
  return (guide, toBeTour) => {
    switch (guide._type) {
      case GuideType.ApprovedGuide: {
        const { publishedTours } = guide;
        const publishedTourList = List(publishedTours);
        const updateIdx = publishedTourList.findIndex(
          t => t.tourId === toBeTour.tourId
        );
        if (updateIdx != -1) {
          const updatedList = publishedTourList.set(updateIdx, toBeTour);
          return {
            ...guide,
            publishedTours: updatedList.toArray()
          };
        }
        return guide;
      }
      default: {
        throw new Error('Guide must be approved to update published tour');
      }
    }
  };
}

export function editGuide(): EditGuide {
  return (guide, profile) => {
    return {
      ...guide,
      profile
    };
  };
}
