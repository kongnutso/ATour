import { Tour, UnbookedTrip, PartialTour, TripType, Trip } from './types';

export type IdGenerator = () => string;
export type DateGenerator = () => Date;

export type PublishTour = (
  tourName: string,
  minSize: number,
  maxSize: number,
  price: number,
  detail: string,
  guideId: string,
  imageUrl?: string
) => Tour;

export type EditTour = (t: Tour, updateInfo: PartialTour) => Tour;

export type AddTrip = (t: Tour, d: Date) => Trip;

export type DeleteTrip = (t: Tour, tripId: string) => Tour;

export function publishTour(idGenerator: IdGenerator): PublishTour {
  return (
    tourName: string,
    minimumSize: number,
    maximumSize: number,
    price: number,
    detail: string,
    guideId: string,
    imageUrl?: string
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
      imageUrl: imageUrl || null
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
  return (tour: Tour, tripDate: Date): Trip => {
    const addedTrip: UnbookedTrip = {
      _type: TripType.UnbookedTrip,
      tripId: idGenerator(),
      tripDate,
      tourId: tour.tourId,
      tourName: tour.tourName
    };
    return addedTrip
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
