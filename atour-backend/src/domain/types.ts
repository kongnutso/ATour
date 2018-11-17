export type Review = {
  reviewId: string;
  authorId: string;
  comment: string;
  date: Date;
};

export type SlipImage = {
  url: string;
};

export type UnbookedTrip = {
  tripId: string;
  tripDate: Date;
};

export type BookInfo = {
  bookDate: Date;
  customerId: string;
};

export type BookedTrip = {
  tripId: string;
  tripDate: Date;
  bookInfo: BookInfo;
};

export type PaidTrip = {
  tripId: string;
  tripDate: Date;
  bookDate: Date;
  paidDate: Date;
  slipImages: SlipImage[];
};

export type ApprovedTrip = {
  tripId: string;
  tripDate: Date;
  bookDate: Date;
  paidDate: Date;
  slipImages: SlipImage[];
  approveDate: Date;
};

export type RefundedTrip = {
  tripId: string;
  tripDate: Date;
  bookDate: Date;
  paidDate: Date;
  slipImages: SlipImage[];
  approveDate: Date;
  refundDate: Date;
};

export type FinishedTrip = {
  tripId: string;
  tripDate: Date;
  bookDate: Date;
  paidDate: Date;
  slipImages: SlipImage[];
  approveDate: Date;
  finishDate: Date;
};

export type CancelledTrip = {
  tripId: string;
  tripDate: Date;
  cancelDate: string;
};

export type Trip =
  | UnbookedTrip
  | BookedTrip
  | PaidTrip
  | ApprovedTrip
  | RefundedTrip
  | FinishedTrip
  | CancelledTrip;

export type Tour = {
  tourId: string;
  tourName: string;
  minimumSize: number;
  maximumSize: number;
  price: number;
  detail: string;
  trips: Trip[];
  reviews: Review[];
  guideId: string;
};

export type PartialTour = {
  tourName?: string;
  minimumSize?: number;
  maximumSize?: number;
  price?: number;
  detail?: string;
};

export type Gender = 'Male' | 'Female';

export type UserProfile = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  birthDate: Date;
  gender: Gender;
};

export enum ApprovalStatus {
  NotApprove,
  Approved
}

export type User = Customer | Guide;

export type Customer = {
  userName: string;
  password: string;
  personalId: string;
  email: string;
  profile: UserProfile;
  customerId: string;
  tripHistory: Trip[];
};

export type Guide = UnApprovedGuide | ApprovedGuide | BadGuide;
export enum GuideType {
  UnApprovedGuide,
  ApprovedGuide,
  BadGuide
}

export type UnApprovedGuide = {
  _type: GuideType.UnApprovedGuide;
  guideId: string;
  userName: string;
  password: string;
  personalId: string;
  email: string;
  profile: UserProfile;
  bankAccountNumber: string;
  bankName: string;
  approvalStatus: ApprovalStatus.NotApprove;
};

export type ApprovedGuide = {
  _type: GuideType.ApprovedGuide;
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

export type BadGuide = {
  _type: GuideType.BadGuide;
  guideId: string;
  userName: string;
  password: string;
  personalId: string;
  email: string;
  profile: UserProfile;
  bankAccountNumber: string;
  bankName: string;
  approvalStatus: ApprovalStatus;
  availableDate: Date[];
  dealtTrips: Trip[];
  publishedTours: Tour[];
};
