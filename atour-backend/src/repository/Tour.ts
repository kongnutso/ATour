import { Tour } from 'domain/types';
import { Db } from 'mongodb';

export type GetTourDb = (tourId: string) => Promise<Tour>;
export type SaveTourDb = (t: Tour) => Promise<void>;

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
