import { 
  Tour,
  Trip,
  Review

} from 'domain/types';
import { Db } from 'mongodb';

export type GetTourDb = (tourId: string) => Promise<Tour>;
export type SaveTourDb = (t: Tour) => Promise<void>;
export type UpdateTourDb = (tour: Tour) => Promise<void>;
export type GetTripDb = (tripId: string) => Promise<Trip>;
export type SaveTripDb = (t: Trip) => Promise<void>;
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
    await db.collection('tour').insert(tour);
  };
}

export function getTrip(db: Db): GetTripDb {
  return async (tripId) => {
    return await db.collection('trip').findOne({ tripId});
  }
} 

export function saveTrip(db: Db): SaveTripDb {
  return async (trip) => {
    await db.collection('trip').insert(trip);
  }
}

export function updateTour(db: Db): UpdateTourDb {
  return async (tour) =>{
    await db.collection('tour')
    .update({tourId: tour.tourId},{$set :{tour}});
  };
}

export function updateTrip(db: Db): UpdateTripDb {
  return async (trip) => {
    await db.collection('trip')
      .update({ tripId: trip.tripId }, { $set: { trip } });
  };
}

export function getReview(db: Db): GetReviewDb {
  return async (reviewId) => {
    return await db.collection('review').findOne({ reviewId });
  }
} 

export function saveReview(db: Db): SaveReviewDb {
  return async (review) => {
    await db.collection('review').insert(review);
  }
}

export function updateReview(db: Db): UpdateReviewDb {
  return async (review) => {
    await db.collection('review')
      .update({ reviewId: review.reviewId }, { $set: { review } });
  };
}

export function deleteReview(db: Db): DeleteReviewDb {
  return async (review) => {
    await db.collection('review')
      .deleteOne({ reviewId: review.reviewId });
  };
}

