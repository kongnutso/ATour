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
};

export type UserProfile = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  birthDate: string;
};

export enum RegistrationStatus {
  NotConfirm,
  Confirmed
}

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
  registrationStatus: RegistrationStatus;
  customerId: string;
  tripHistory: Trip[];
};

export type Guide = {
  userName: string;
  password: string;
  personalId: string;
  email: string;
  profile: UserProfile;
  registrationStatus: RegistrationStatus;
  guideId: string;
  availableDate: Date[];
  approvalStatus: ApprovalStatus;
  bankAccountNumber: string;
  bankName: string;
  dealtTrips: Trip[];
  publishedTours: Tour[];
  allTours: Tour[];
};
