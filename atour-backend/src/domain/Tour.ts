import { Tour, UnbookedTrip, PartialTour } from './types';

export type IdGenerator = () => string;

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
      guideId
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
    const addedTrip: UnbookedTrip = { tripId: idGenerator(), tripDate };
    const newTrips = [...tour.trips, addedTrip];
    return {
      ...tour,
      trips: newTrips
    };
  };
}
