import { List } from 'immutable';
import{
    Customer,
    Tour,
    Review,
    BookedTrip,
    SlipImage,
    PaidTrip,
    FinishedTrip,
    Trip,
    TripType
    

    } from './types';

import { IdGenerator } from "./Tour";

type BookTrip = (
    tripId: string,
    tripDate: Date,
    customerId: string,
    size: number,
    price: number,
    BookDate: Date

)=> BookedTrip;

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
) => Review

type EditReview = (
    review: Review,
    comment: string,
    date: Date
) => Review

type AddReviewToTour = (
    tour: Tour,
    review: Review
) => Tour

type RemoveReviewFromTour = (
    tour: Tour,
    review: Review
) => Tour

type SeeBookHistory = (
    customer: Customer
) => Trip[]

type UpdateTripToTour = (
    tour: Tour,
    trip: Trip
) => Tour

type UpdateCustomerTripHistory = (
    customer: Customer,
    trip: Trip
) => Customer

export function bookTrip() : BookTrip{
    return (
        tripId,
        tripDate,
        customerId,
        size,
        price,
        bookDate
    ) => {
        const trip: BookedTrip = {
            _type: TripType.BookedTrip,
            tripId,
            tripDate,
            bookInfo: {
                bookDate,
                customerId,
                size,
                price
            }
        };
        return trip;
    };
}

export function uploadPayment(): UploadPayment{
    return (
        trip,
        slipImage,
        paidDate
    ) => {
        switch(trip._type){
            case TripType.BookedTrip: {
                const paidTrip: PaidTrip = {
                    _type: TripType.PaidTrip,
                    tripId: trip.tripId,
                    tripDate: trip.tripDate,
                    bookInfo: trip.bookInfo,
                    paidDate: paidDate,
                    slipImages: [slipImage] 

                }
                return paidTrip
            }
            case TripType.PaidTrip: {
                const addedSlipImages = [...trip.slipImages, slipImage];
                return {
                    ...trip,
                    paidDate: paidDate,
                    slipImages: addedSlipImages
                };
            }
            default: {
                throw new Error('Trip is not booked or paid');
            }
        }
        

        
    };
}

export function createReview(idGenerator : IdGenerator) : CreateReview {
    return (
        trip,
        authorId,
        comment,
        date
    ) => {
        switch (trip._type){
            case TripType.FinishedTrip: {
                const review: Review = {
                    reviewId: idGenerator(),
                    authorId,
                    comment,
                    date: date

                }
                return review;
            }
            default: {
                throw new Error('Your trip is not finished');
            }
        }
    };
}

export function editReview() : EditReview {
    return (
        review,
        comment,
        date
    ) => {
        const newReview: Review = {
            ...review,
            comment,
            date: date
        }
        return newReview;
    };
}

export function addReviewToTour() : AddReviewToTour {
    return (tour, review) => {
        const addedReviews = [...tour.reviews, review]
        return {
            ...tour,
            reviews: addedReviews
        };
    }
}

export function removeReviewFromTour() : RemoveReviewFromTour {
    return (tour, review)=>{
        const { reviews } = tour;
        const reviewList = List(reviews);
        const deleteIdx = reviewList.findIndex(
            t => t.reviewId === review.reviewId
        );
        if (deleteIdx != -1) {
            const updatedList = reviewList.delete(deleteIdx);
            return {
                ...tour,
                reviews: updatedList.toArray()
            }
        }
        return tour;
    }
}

export function seeBookHistory() : SeeBookHistory {
    return (customer) =>{
        return customer.tripHistory;
    };
}

export function updateTripToTour() : UpdateTripToTour {
    return (tour,trip) => {
        const { trips } = tour;
        const tripList = List(trips);
        const updateIdx = tripList.findIndex(
            t => t.tripId === trip.tripId
        );
        if (updateIdx != -1){
            const updatedList = tripList.set(updateIdx, trip);
            return {
                ...tour,
                trips: updatedList.toArray()
            }
        }
        return tour;
    }
}

export function updateCustomerTripHistory(): UpdateCustomerTripHistory {
    return (customer,trip) => {
        const { tripHistory } = customer;
        const historyTripList = List(tripHistory);
        const updateIdx = historyTripList.findIndex(
            t => t.tripId === trip.tripId
        );
        if (updateIdx != -1) {
            const updatedList = historyTripList.set(updateIdx, trip);
            return {
                ...customer,
                tripHistory: updatedList.toArray()
            }
        }

        return customer
    }
}