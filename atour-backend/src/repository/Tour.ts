import { 
  Tour,
  Trip,
  UnbookedTrip,
  BookedTrip,
  BookInfo,
  PaidTrip,
  SlipImage,
  FinishedTrip,
  ApprovedTrip,
  CancelledTrip

} from 'domain/types';
import { Db } from 'mongodb';

export type GetTourDb = (tourId: string) => Promise<Tour>;
export type SaveTourDb = (t: Tour) => Promise<void>;
export type UpdateTourDb = (tour: Tour) => Promise<void>;
export type GetTripDb = (tripId: string) => Promise<Trip>;
export type SaveTripDb = (t: Trip) => Promise<void>;
export type UpdateTripDb = (trip: Trip) => Promise<void>;


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

export function getTripDb(db: Db): GetTripDb {
  return async (tripId) => {
    return await db.collection('trip').findOne({ tripId});
  }
} 

export function saveTripDb(db: Db): SaveTripDb {
  return async (trip) => {
    await db.collection('trip').insert(trip);
  }
}

export function updateTourDb(db: Db): UpdateTourDb {
  return async (tour) =>{
    await db.collection('tour')
    .update({tourId: tour.tourId},{$set :{tour}});
  };
}

export function updateTripDb(db: Db): UpdateTripDb {
  return async (trip) => {
    await db.collection('trip')
      .update({ tripId: trip.tripId }, { $set: { trip } });
  };
}
