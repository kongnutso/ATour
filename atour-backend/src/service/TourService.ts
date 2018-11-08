import * as uuid from 'uuid/v4';
import { publishTour } from '../domain/Tour';
import { SaveTourDb } from '../repository/Tour';
import { addPublishTour } from '../domain/Guide';
import { GetGuideDb, SaveGuideDb } from '../repository/Guide';

type CreateTourService = (
  guideId: string,
  tourName: string,
  minSize: number,
  maxSize: number,
  price: number,
  detail: string
) => Promise<void>;

export function publishTourService(
  getGuideDb: GetGuideDb,
  saveTourDb: SaveTourDb,
  saveGuideDb: SaveGuideDb
): CreateTourService {
  return async (
    guideId: string,
    tourName: string,
    minSize: number,
    maxSize: number,
    price: number,
    detail: string
  ) => {
    const guide = await getGuideDb(guideId);
    const tour = publishTour(() => uuid())(
      tourName,
      minSize,
      maxSize,
      price,
      detail
    );
    const addedGuide = addPublishTour()(guide, tour);
    await saveTourDb(tour);
    await saveGuideDb(addedGuide);
  };
}
