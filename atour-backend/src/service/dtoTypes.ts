import {
  UnApprovedGuide,
  Trip,
  Tour,
  Guide,
  ApprovedGuide,
  BadGuide,
  RejectedGuide,
  Customer
} from '../domain/types';

export type GuideDto =
  | UnApprovedGuideDto
  | ApprovedGuideDto
  | BadGuideDto
  | RejectedGuideDto;
export type UnApprovedGuideDto = UnApprovedGuide;
export type ApprovedGuideDto = ApprovedGuide & {
  publishedTours: Tour[];
  dealtTripsDto: DealtTripDto[];
};
export type BadGuideDto = BadGuide & {
  publishedTours: Tour[];
  dealtTripsDto: DealtTripDto[];
};
export type RejectedGuideDto = RejectedGuide & {
  publishedTours: Tour[];
  dealtTripsDto: DealtTripDto[];
};

export type TripDto = Trip & { tour: Tour; guide: Guide };

export type DealtTripDto = Trip & {customer : Customer};
