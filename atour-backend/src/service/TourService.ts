import * as uuid from 'uuid/v4';
import { createTour } from '../domain/Tour';
import { SaveTourDb } from '../repository/Tour';

type CreateTourService = (
  tourName: string,
  minSize: number,
  maxSize: number,
  price: number,
  detail: string
) => Promise<void>;

export function createTourService(saveTourDb: SaveTourDb): CreateTourService {
  return async (
    tourName: string,
    minSize: number,
    maxSize: number,
    price: number,
    detail: string
  ) => {
    const tour = createTour(() => uuid())(
      tourName,
      minSize,
      maxSize,
      price,
      detail
    );
    await saveTourDb(tour);
  };
}
