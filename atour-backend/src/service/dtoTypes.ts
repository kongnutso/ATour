import {
  UnApprovedGuide,
  Trip,
  Tour,
  Guide,
  ApprovedGuide,
  BadGuide,
  RejectedGuide
} from '../domain/types';

export type GuideDto =
  | UnApprovedGuideDto
  | ApprovedGuideDto
  | BadGuideDto
  | RejectedGuideDto;
export type UnApprovedGuideDto = UnApprovedGuide;
export type ApprovedGuideDto = ApprovedGuide & {
  publishedTours: Tour[];
};
export type BadGuideDto = BadGuide & {
  publishedTours: Tour[];
};
export type RejectedGuideDto = RejectedGuide & {
  publishedTours: Tour[];
};

export type TripDto = Trip & { tour: Tour; guide: Guide };
