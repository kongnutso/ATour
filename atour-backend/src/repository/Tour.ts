import { Tour } from 'domain/types';
import { Db } from 'mongodb';

export type SaveTourDb = (t: Tour) => Promise<void>;

export function saveTour(db: Db): SaveTourDb {
  return async tour => {
    await db.collection('tour').insert(tour);
  };
}
