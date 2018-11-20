import { Tour, UnbookedTrip, PartialTour, TripType } from './types';

export type IdGenerator = () => string;
export type DateGenerator = () => Date;

export type PublishTour = (
  tourName: string,
  minSize: number,
  maxSize: number,
  price: number,
  detail: string,
  guideId: string
) => Tour;

export type EditTour = (t: Tour, updateInfo: PartialTour) => Tour;

export type AddTrip = (t: Tour, d: Date) => Tour;

export type DeleteTrip = (t: Tour, tripId: string) => Tour;

export function publishTour(idGenerator: IdGenerator): PublishTour {
  return (
    tourName: string,
    minimumSize: number,
    maximumSize: number,
    price: number,
    detail: string,
    guideId: string
  ): Tour => {
    const tour: Tour = {
      tourId: idGenerator(),
      tourName,
      minimumSize,
      maximumSize,
      price,
      detail,
      trips: [],
      reviews: [],
      guideId,
      imageUrl: null
    };
    return tour;
  };
}

export function editTour(): EditTour {
  return (tour, updateInfo) => {
    return {
      ...tour,
      ...updateInfo
    };
  };
}

export function addTrip(idGenerator: IdGenerator): AddTrip {
  return (tour: Tour, tripDate: Date): Tour => {
    const addedTrip: UnbookedTrip = {
      _type: TripType.UnbookedTrip,
      tripId: idGenerator(),
      tripDate,
      tourId: tour.tourId,
      tourName: tour.tourName
    };
    const newTrips = [...tour.trips, addedTrip];
    return {
      ...tour,
      trips: newTrips
    };
  };
}

export function deleteTrip(): DeleteTrip {
  return (tour, tripId) => {
    const { trips } = tour;
    const newTrips = trips.filter(t => t.tripId !== tripId);
    return {
      ...tour,
      trips: newTrips
    };
  };
}
