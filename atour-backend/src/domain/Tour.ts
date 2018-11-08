import { Tour, UnbookedTrip } from './types';

export type IdGenerator = () => string;

export type PublishTour = (
  tourName: string,
  minSize: number,
  maxSize: number,
  price: number,
  detail: string
) => Tour;

export type PublishTrip = (t: Tour, d: Date) => Tour;

export function publishTour(idGenerator: IdGenerator): PublishTour {
  return (
    tourName: string,
    minimumSize: number,
    maximumSize: number,
    price: number,
    detail: string
  ): Tour => {
    const tour: Tour = {
      tourId: idGenerator(),
      tourName,
      minimumSize,
      maximumSize,
      price,
      detail,
      trips: [],
      reviews: []
    };
    return tour;
  };
}
export function publishTrip(idGenerator: IdGenerator): PublishTrip {
  return (tour: Tour, tripDate: Date): Tour => {
    const addedTrip: UnbookedTrip = { tripId: idGenerator(), tripDate };
    const newTrips = [...tour.trips, addedTrip];
    return {
      ...tour,
      trips: newTrips
    };
  };
}
