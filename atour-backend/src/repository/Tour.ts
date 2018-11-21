import { Tour, Trip, Review, TripType } from '../domain/types';
import { Db } from 'mongodb';

export type GetTourDb = (tourId: string) => Promise<Tour>;
export type SaveTourDb = (t: Tour) => Promise<void>;
export type UpdateTourDb = (tour: Tour) => Promise<void>;
export type GetTripDb = (tripId: string) => Promise<Trip>;
export type GetPendingPaymentTripDb = () => Promise<Trip[]>;
export type GetRefundTripDb = () => Promise<Trip[]>;
export type SaveTripDb = (t: Trip) => Promise<void>;
export type DeleteTripDb = (tripId: string) => Promise<void>;
export type UpdateTripDb = (trip: Trip) => Promise<void>;
export type GetReviewDb = (reviewId: string) => Promise<Review>;
export type SaveReviewDb = (r: Review) => Promise<void>;
export type UpdateReviewDb = (review: Review) => Promise<void>;
export type DeleteReviewDb = (review: Review) => Promise<void>;

export function getTour(db: Db): GetTourDb {
  return async tourId => {
    return await db.collection('tour').findOne({ tourId });
  };
}
export function saveTour(db: Db): SaveTourDb {
  return async tour => {
    await db
      .collection('tour')
      .update({ tourId: tour.tourId }, tour, { upsert: true });
  };
}

export function getTrip(db: Db): GetTripDb {
  return async tripId => {
    return await db.collection('trip').findOne({ tripId });
  };
}

export function getPendingPaymentTripDb(db: Db): GetPendingPaymentTripDb {
  return async () => {
    const cursor = await db.collection('trip').find({_type: TripType.PaidTrip});
    const results = await cursor.toArray();
    return results;
  }
}

export function getRefundTripDb(db: Db): GetRefundTripDb {
  return async () => {
    const cursor = await db.collection('trip').find({_type: TripType.RefundRequestedTrip});
    const results = await cursor.toArray();
    return results;
  }
}

export function saveTrip(db: Db): SaveTripDb {
  return async trip => {
    await db
      .collection('trip')
      .update({ tripId: trip.tripId }, trip, { upsert: true });
  };
}

export function deleteTripDb(db: Db): DeleteTripDb {
  return async tripId => {
    db.collection('trip').deleteOne({ tripId });
  };
}

export function updateTour(db: Db): UpdateTourDb {
  return async tour => {
    const tourId = tour.tourId;
    await db
      .collection('tour')
      // .updateOne({ tourId },{$set :tour});
      .update({ tourId }, tour);
  };
}

export function updateTrip(db: Db): UpdateTripDb {
  return async trip => {
    const tripId = trip.tripId;
    await db
      .collection('trip')
      // .updateOne({tripId}, { $set:  trip  });
      .update({ tripId }, trip);
  };
}

export function getReview(db: Db): GetReviewDb {
  return async reviewId => {
    return await db.collection('review').findOne({ reviewId });
  };
}

export function saveReview(db: Db): SaveReviewDb {
  return async review => {
    await db.collection('review').insert(review);
  };
}

export function updateReview(db: Db): UpdateReviewDb {
  return async review => {
    const reviewId = review.reviewId;
    await db
      .collection('review')
      // .updateOne({ reviewId }, { $set:  review  });
      .update({ reviewId }, review);
  };
}

export function deleteReview(db: Db): DeleteReviewDb {
  return async review => {
    const reviewId = review.reviewId;
    await db.collection('review').deleteOne({ reviewId });
  };
}
