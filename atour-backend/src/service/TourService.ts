import * as _ from 'lodash';
import {
  publishTour,
  editTour,
  IdGenerator,
  addTrip,
  deleteTrip
} from '../domain/Tour';
import {
  SaveTourDb,
  GetTourDb,
  SaveTripDb,
  DeleteTripDb,
  GetTripDb
} from '../repository/Tour';
import { addPublishedTour, editPublishedTour } from '../domain/Guide';
import { GetGuideDb, SaveGuideDb } from '../repository/Guide';
import { Tour } from '../domain/types';
import { TripDto } from './dtoTypes';

type PublishTourService = (
  guideId: string,
  tourName: string,
  minSize: number,
  maxSize: number,
  price: number,
  detail: string,
  imageUrl?: string
) => Promise<Tour>;

type EditTourService = (
  tourId: string,
  tourName: string | void,
  minimumSize: number | void,
  maximumSize: number | void,
  price: number | void,
  detail: string | void,
  imageUrl: string | void
) => Promise<Tour>;

type AddTripService = (tourId: string, date: string) => Promise<Tour>;

type DeleteTripService = (tourId: string, tripId: string) => Promise<Tour>;

type GetTripService = (tripId: string) => Promise<TripDto>;

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
    detail: string,
    imageUrl?: string
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
      guideId,
      imageUrl
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
    detail?: string,
    imageUrl?: string
  ) => {
    const tour = await getTourDb(tourId);
    const obj = {
      tourName,
      minimumSize,
      maximumSize,
      price,
      detail,
      imageUrl
    };
    const partialTour = _.fromPairs(_.toPairs(obj).filter(([k, v]) => v));

    const editedTour = editTour()(tour, partialTour);

    const guide = await getGuideDb(tour.guideId);
    const editedGuide = await editPublishedTour()(guide, editedTour);
    await saveTourDb(editedTour);
    await saveGuideDb(editedGuide);
    return editedTour;
  };
}

export function addTripService(
  getTourDb: GetTourDb,
  saveTourDb: SaveTourDb,
  saveTripDb: SaveTripDb,
  idGenerator: IdGenerator
): AddTripService {
  return async (tourId: string, date: string) => {
    const tour = await getTourDb(tourId);
    const addedTrip = addTrip(idGenerator)(tour, new Date(date));
    const {trips} = tour;
    const addedTrips = [...trips,addedTrip]
    const tripAddedTour = {...tour,trips: addedTrips}
    await saveTourDb(tripAddedTour);
    await saveTripDb(addedTrip);
    return tripAddedTour;
  };
}

export function deleteTripService(
  getTourDb: GetTourDb,
  saveTourDb: SaveTourDb,
  deleteTripDb: DeleteTripDb
): DeleteTripService {
  return async (tourId, tripId) => {
    const tour = await getTourDb(tourId);
    const tripDeletedTour = deleteTrip()(tour, tripId);
    await saveTourDb(tripDeletedTour);
    await deleteTripDb(tripId);
    return tripDeletedTour;
  };
}

export function getTripService(
  getTrip: GetTripDb,
  getTour: GetTourDb,
  getGuide: GetGuideDb
): GetTripService {
  return async (tripId: string) => {
    const trip = await getTrip(tripId);
    const tour = await getTour(trip.tourId);
    const guide = await getGuide(tour.guideId);
    return {
      ...trip,
      tour,
      guide
    };
  };
}
