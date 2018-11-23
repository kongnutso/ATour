import {
  UnApprovedGuide,
  GuideType,
  UserProfile,
  ApprovalStatus,
  Trip,
  Tour,
  Guide,
  ApprovedGuide
} from '../domain/types';

export type GuideDto = UnApprovedGuideDto | ApprovedGuideDto | BadGuideDto;
export type UnApprovedGuideDto = UnApprovedGuide;
export type ApprovedGuideDto = ApprovedGuide & {
  publishedTours: Tour[];
};

export type BadGuideDto = {
  _type: GuideType.BadGuide;
  guideId: string;
  userName: string;
  password: string;
  personalId: string;
  email: string;
  profile: UserProfile;
  bankAccountNumber: string;
  bankName: string;
  approvalStatus: ApprovalStatus.Approved;
  availableDate: Date[];
  dealtTrips: Trip[];
  publishedTours: Tour[];
};

export type TripDto = Trip & { tour: Tour; guide: Guide };
