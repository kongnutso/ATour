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
  _type: TripType.UnbookedTrip;
  tripId: string;
  tripDate: Date;
  tourId: string;
  tourName: string;
};

export type BookInfo = {
  bookDate: Date;
  customerId: string;
  size: number;
  price: number;
};

export type BookedTrip = {
  _type: TripType.BookedTrip;
  tripId: string;
  tripDate: Date;
  bookInfo: BookInfo;
  tourId: string;
  tourName: string;
};

export type PaidTrip = {
  _type: TripType.PaidTrip;
  tripId: string;
  tripDate: Date;
  bookInfo: BookInfo;
  paidDate: Date;
  slipImages: SlipImage[];
  tourId: string;
  tourName: string;
};

export type RejectedPaidTrip = {
  _type: TripType.RejectedPaidTrip;
  tripId: string;
  tripDate: Date;
  bookInfo: BookInfo;
  paidDate: Date;
  slipImages: SlipImage[];
  tourId: string;
  tourName: string;
};

export type ApprovedTrip = {
  _type: TripType.ApprovedTrip;
  tripId: string;
  tripDate: Date;
  bookInfo: BookInfo;
  paidDate: Date;
  slipImages: SlipImage[];
  approveDate: Date;
  tourId: string;
  tourName: string;
};

export type RefundRequestedTrip = {
  _type: TripType.RefundRequestedTrip;
  tripId: string;
  tripDate: Date;
  bookInfo: BookInfo;
  paidDate: Date;
  slipImages: SlipImage[];
  approveDate: Date;
  refundRequestDate: Date;
  tourId: string;
  tourName: string;
};

export type RefundedTrip = {
  _type: TripType.RefundedTrip;
  tripId: string;
  tripDate: Date;
  bookInfo: BookInfo;
  paidDate: Date;
  slipImages: SlipImage[];
  approveDate: Date;
  refundRequestDate: Date;
  refundDate: Date;
  tourId: string;
  tourName: string;
};

export type FinishedTrip = {
  _type: TripType.FinishedTrip;
  tripId: string;
  tripDate: Date;
  bookInfo: BookInfo;
  paidDate: Date;
  slipImages: SlipImage[];
  approveDate: Date;
  finishDate: Date;
  tourId: string;
  tourName: string;
  review: Review | null;
};

export type CancelledTrip = {
  _type: TripType.CancelledTrip;
  tripId: string;
  tripDate: Date;
  bookInfo: BookInfo;
  cancelDate: Date;
  tourId: string;
  tourName: string;
};


export type Trip =
  | UnbookedTrip
  | BookedTrip
  | PaidTrip
  | RejectedPaidTrip
  | ApprovedTrip
  | RefundRequestedTrip
  | RefundedTrip
  | FinishedTrip
  | CancelledTrip
  | RejectedPaidTrip;
export enum TripType {
  UnbookedTrip,
  BookedTrip,
  PaidTrip,
  RejectedPaidTrip,
  ApprovedTrip,
  RefundRequestedTrip,
  RefundedTrip,
  FinishedTrip,
  CancelledTrip,

}

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
  imageUrl: string | null;
};

export type PartialTour = {
  tourName?: string;
  minimumSize?: number;
  maximumSize?: number;
  price?: number;
  detail?: string;
  imageUrl?: string;
};

export type Gender = 'Male' | 'Female';

export type UserProfile = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  birthDate: Date;
  gender: Gender;
  profileImageUrl: string | null;
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

export type Guide = UnApprovedGuide | ApprovedGuide | BadGuide | RejectedGuide;
export enum GuideType {
  UnApprovedGuide,
  ApprovedGuide,
  BadGuide,
  RejectedGuide
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
  approvalStatus: ApprovalStatus.Approved;
  availableDate: Date[];
  dealtTrips: Trip[];
};

export type RejectedGuide = {
  _type: GuideType.RejectedGuide;
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
