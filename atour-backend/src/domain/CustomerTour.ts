import { List } from 'immutable';
import {
  Customer,
  Tour,
  Review,
  BookedTrip,
  SlipImage,
  PaidTrip,
  FinishedTrip,
  Trip,
  TripType,
  RefundRequestedTrip,
  CancelledTrip,
  UnbookedTrip
} from './types';

import { IdGenerator } from './Tour';

type BookTrip = (
  trip: UnbookedTrip,
  customerId: string,
  size: number,
  price: number,
  bookDate: Date
) => BookedTrip;

type UploadPayment = (
  trip: Trip,
  slipImage: SlipImage,
  paidDate: Date
) => PaidTrip;

type CreateReview = (
  trip: FinishedTrip,
  authorId: string,
  comment: string,
  date: Date
) => Review;

type EditReview = (review: Review, comment: string, date: Date) => Review;

type AddReviewToTour = (tour: Tour, review: Review) => Tour;

type RemoveReviewFromTour = (tour: Tour, review: Review) => Tour;

type SeeBookHistory = (customer: Customer) => Trip[];

type UpdateTripToTour = (tour: Tour, trip: Trip) => Tour;

type UpdateCustomerTripHistory = (customer: Customer, trip: Trip) => Customer;

type AddTripToCustomer = (customer: Customer, trip: Trip) => Customer;

type RefundTrip = (trip: Trip, date: Date) => RefundRequestedTrip;

type CancelTrip = (trip: Trip, date: Date) => CancelledTrip;

type FreeTrip = (trip: Trip) => UnbookedTrip;

type UpdateReviewToTour = (tour: Tour, review: Review) => Tour;


export function bookTrip(): BookTrip {
  return (unbookedTrip, customerId, size, price, bookDate) => {
    const bookedTrip: BookedTrip = {
      ...unbookedTrip,
      _type: TripType.BookedTrip,
      bookInfo: {
        bookDate,
        customerId,
        size,
        price
      }
    };
    return bookedTrip;
  };
}

export function uploadPayment(): UploadPayment {
  return (trip, slipImage, paidDate) => {
    switch (trip._type) {
      case TripType.BookedTrip: {
        const paidTrip: PaidTrip = {
          _type: TripType.PaidTrip,
          tripId: trip.tripId,
          tripDate: trip.tripDate,
          bookInfo: trip.bookInfo,
          paidDate: paidDate,
          slipImages: [slipImage],
          tourId: trip.tourId,
          tourName: trip.tourName,
        };
        return paidTrip;
      }
      case TripType.PaidTrip: {
        const addedSlipImages = [...trip.slipImages, slipImage];
        return {
          ...trip,
          paidDate: paidDate,
          slipImages: addedSlipImages
        };
      }
      case TripType.RejectedPaidTrip: {
        const addedSlipImages = [...trip.slipImages, slipImage];
        return {
          _type: TripType.PaidTrip,
          tripId: trip.tripId,
          tripDate: trip.tripDate,
          bookInfo: trip.bookInfo,
          paidDate: paidDate,
          slipImages: addedSlipImages,
          tourId: trip.tourId,
          tourName: trip.tourName,
        };
      }
      default: {
        throw new Error('Trip is not booked or paid');
      }
    }
  };
}

export function createReview(idGenerator: IdGenerator): CreateReview {
  return (trip, authorId, comment, date) => {
    const review: Review = {
      reviewId: idGenerator(),
      authorId,
      comment,
      date: date
    };
    return review;
  };
}

export function editReview(): EditReview {
  return (review, comment, date) => {
    const newReview: Review = {
      ...review,
      comment,
      date: date
    };
    return newReview;
  };
}

export function addReviewToTour(): AddReviewToTour {
  return (tour, review) => {
    const addedReviews = [...tour.reviews, review];
    return {
      ...tour,
      reviews: addedReviews
    };
  };
}

export function removeReviewFromTour(): RemoveReviewFromTour {
  return (tour, review) => {
    const { reviews } = tour;
    const reviewList = List(reviews);
    const deleteIdx = reviewList.findIndex(t => t.reviewId === review.reviewId);
    if (deleteIdx != -1) {
      const updatedList = reviewList.delete(deleteIdx);
      return {
        ...tour,
        reviews: updatedList.toArray()
      };
    }
    return tour;
  };
}

export function seeBookHistory(): SeeBookHistory {
  return customer => {
    return customer.tripHistory;
  };
}

export function updateTripToTour(): UpdateTripToTour {
  return (tour, trip) => {
    const { trips } = tour;
    const tripList = List(trips);
    const updateIdx = tripList.findIndex(t => t.tripId === trip.tripId);
    if (updateIdx != -1) {
      const updatedList = tripList.set(updateIdx, trip);
      return {
        ...tour,
        trips: updatedList.toArray()
      };
    }
    return tour;
  };
}

export function updateReviewToTour(): UpdateReviewToTour {
  return (tour, review) => {
    const { reviews } = tour;
    const reviewList = List(reviews);
    const updateIdx = reviewList.findIndex(r => r.reviewId === review.reviewId);
    if (updateIdx != -1) {
      const updatedList = reviewList.set(updateIdx, review);
      return {
        ...tour,
        review: updatedList.toArray()
      };
    }
    return tour;
  };
}


export function updateCustomerTripHistory(): UpdateCustomerTripHistory {
  return (customer, trip) => {
    const { tripHistory } = customer;
    const historyTripList = List(tripHistory);
    const updateIdx = historyTripList.findIndex(t => t.tripId === trip.tripId);
    if (updateIdx != -1) {
      const updatedList = historyTripList.set(updateIdx, trip);
      return {
        ...customer,
        tripHistory: updatedList.toArray()
      };
    }

    return customer;
  };
}

export function addTripToCustomer(): AddTripToCustomer {
  return (customer, trip) => {
    const addedTripHistory = [...customer.tripHistory, trip];
    return {
      ...customer,
      tripHistory: addedTripHistory
    };
  };
}

export function refundTrip(): RefundTrip {
  return (trip, date) => {
    switch (trip._type) {
      case TripType.ApprovedTrip: {
        const refundRequestedTrip: RefundRequestedTrip = {
          ...trip,
          _type: TripType.RefundRequestedTrip,
          refundRequestDate: date
        };

        return refundRequestedTrip;
      }
      default: {
        throw new Error('Your payment has not been approved');
      }
    }
  };
}

export function cancelTrip(): CancelTrip {
  return (trip, date) => {
    if (trip._type == TripType.BookedTrip || trip._type == TripType.PaidTrip) {
      return {
        _type: TripType.CancelledTrip,
        tripId: trip.tripId,
        tripDate: trip.tripDate,
        bookInfo: trip.bookInfo,
        cancelDate: date,
        tourId: trip.tourId,
        tourName: trip.tourName,
      };
    } else {
      throw new Error('Trip is not allowed to cancel');
    }
  };
}

export function freeTrip(): FreeTrip {
  return trip => {
    if (trip._type == TripType.CancelledTrip) {
      return {
        _type: TripType.UnbookedTrip,
        tripId: trip.tripId,
        tripDate: trip.tripDate,
        tourId: trip.tourId,
        tourName: trip.tourName,
      };
    } else {
      throw new Error('Trip is not cancelled yet');
    }
  };
}
