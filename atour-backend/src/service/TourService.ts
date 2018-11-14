import { publishTour, editTour, IdGenerator } from '../domain/Tour';
import { SaveTourDb, GetTourDb } from '../repository/Tour';
import { addPublishedTour, editPublishedTour } from '../domain/Guide';
import { GetGuideDb, SaveGuideDb } from '../repository/Guide';
import { Tour } from 'domain/types';

type PublishTourService = (
  guideId: string,
  tourName: string,
  minSize: number,
  maxSize: number,
  price: number,
  detail: string
) => Promise<Tour>;

type EditTourService = (
  tourId: string,
  tourName: string | void,
  minimumSize: number | void,
  maximumSize: number | void,
  price: number | void,
  detail: string | void
) => Promise<Tour>;

export function publishTourService(
  idGenerator: IdGenerator,
  getGuideDb: GetGuideDb,
  saveTourDb: SaveTourDb,
  saveGuideDb: SaveGuideDb
): PublishTourService {
  return async (
    guideId: string,
    tourName: string,
    minSize: number,
    maxSize: number,
    price: number,
    detail: string
  ) => {
    const guide = await getGuideDb(guideId);
    if (!guide) {
      throw new Error('Guide not found');
    }
    const tour = publishTour(idGenerator)(
      tourName,
      minSize,
      maxSize,
      price,
      detail,
      guideId
    );
    const addedGuide = addPublishedTour()(guide, tour);
    await saveTourDb(tour);
    await saveGuideDb(addedGuide);
    return tour;
  };
}

export function editTourService(
  getTourDb: GetTourDb,
  getGuideDb: GetGuideDb,
  saveTourDb: SaveTourDb,
  saveGuideDb: SaveGuideDb
): EditTourService {
  return async (
    tourId: string,
    tourName?: string,
    minimumSize?: number,
    maximumSize?: number,
    price?: number,
    detail?: string
  ) => {
    const tour = await getTourDb(tourId);
    const editedTour = editTour()(tour, {
      tourName,
      minimumSize,
      maximumSize,
      price,
      detail
    });

    const guide = await getGuideDb(tour.guideId);
    const editedGuide = await editPublishedTour()(guide, editedTour);
    await saveTourDb(editedTour);
    await saveGuideDb(editedGuide);
    return editedTour;
  };
}
