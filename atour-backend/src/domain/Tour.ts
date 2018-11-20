import { Tour, UnbookedTrip, PartialTour, TripType } from './types';

export type IdGenerator = () => string;
export type DateGenerator= () => Date;

export type PublishTour = (
  tourName: string,
  minSize: number,
  maxSize: number,
  price: number,
  detail: string,
  guideId: string
) => Tour;

export type EditTour = (t: Tour, updateInfo: PartialTour) => Tour;

export type AddTrip = (t: Tour, d: Date, guideName: string) => Tour;

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
  return (tour: Tour, tripDate: Date, guideName:string): Tour => {
    const addedTrip: UnbookedTrip = {_type: TripType.UnbookedTrip, tripId: idGenerator(), tripDate, tourId: tour.tourId, tourName: tour.tourName,  guideName};
    const newTrips = [...tour.trips, addedTrip];
    return {
      ...tour,
      trips: newTrips
    };
  };
}
