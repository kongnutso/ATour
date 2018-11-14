import{
    Customer,
    Tour,
    Review,
    BookedTrip,
    UnbookedTrip,
    SlipImage,
    BookInfo,
    PaidTrip,
    ApprovedTrip,
    RefundedTrip,
    FinishedTrip,
    CancelledTrip,
    Trip,
    TripType
    

    } from './types';

import { IdGenerator } from "./Tour";

type BookTrip = (
    tripId: string,
    tripDate: Date,
    customerId: string,
    size: number,
    price: number
    // BookDate: Date

)=> BookedTrip;

type UploadPayment = (
    trip: Trip,
    slipImage: SlipImage
) => PaidTrip;

type CreateReview = (
    trip: FinishedTrip,
    authorId: string,
    comment: string
) => Review

type EditReview = (
    review: Review,
    comment: string,
) => Review

type AddReviewToTour = (
    tour: Tour,
    review: Review
) => Tour

type RemoveReview = (
    tour: Tour,
    review: Review
) => Tour

type SeeBookHistory = (
    customer: Customer
) => Trip[]

export function bookTrip() : BookTrip{
    return (
        tripId,
        tripDate,
        customerId,
        size,
        price
        // bookDate
    ) => {
        const trip: BookedTrip = {
            _type: TripType.BookedTrip,
            tripId,
            tripDate,
            bookInfo: {
                bookDate : new Date(),
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
        slipImage
    ) => {
        switch(trip._type){
            case TripType.BookedTrip: {
                const paidTrip: PaidTrip = {
                    _type: TripType.PaidTrip,
                    tripId: trip.tripId,
                    tripDate: trip.tripDate,
                    bookInfo: trip.bookInfo,
                    paidDate: new Date(),
                    slipImages: [slipImage] 

                }
                return paidTrip
            }
            case TripType.PaidTrip: {
                const addedSlipImages = [...trip.slipImages, slipImage];
                return {
                    ...trip,
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
        comment
    ) => {
        switch (trip._type){
            case TripType.FinishedTrip: {
                const review: Review = {
                    reviewId: idGenerator(),
                    authorId,
                    comment,
                    date: new Date(),

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
        comment
    ) => {
        const newReview: Review = {
            ...review,
            comment,
            date: new Date()
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

export function removeReview() : RemoveReview {
    return (tour, review)=>{
        const index = tour.reviews.indexOf(review);
        if( index > -1){
            const removedReviews = tour.reviews.splice(index,1);
            return {
                ...tour,
                reviews: removedReviews
            };
        }
        return tour;
    }
}

export function seeBookHistory() : SeeBookHistory {
    return (customer) =>{
        return customer.tripHistory;
    };
}

