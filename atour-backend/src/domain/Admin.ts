import {
  Trip,
  PaidTrip,
  ApprovedTrip,
  Tour,
  Customer,
  TripType
} from './types'

type ApproveTrip = (t: Trip, d: Date) => ApprovedTrip;

export function approveTrip(): ApproveTrip {
  return (
    trip,
    paidDate
  ) => {
    switch (trip._type) {
      case TripType.PaidTrip: {
        const approvedTrip: ApprovedTrip = {
          _type: TripType.ApprovedTrip,
          tripId: trip.tripId,
          tripDate: trip.tripDate,
          bookInfo: trip.bookInfo,
          paidDate: trip.paidDate,
          slipImages: trip.slipImages,
          approveDate: paidDate
        };
        return approvedTrip;
      }
      default: {
        throw new Error('Trip is not paid');
      }
    }
  }
}