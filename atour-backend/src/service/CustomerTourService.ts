import {
    GetCustomerDb, UpdateCustomerDb
} from '../repository/Customer';

import {
    GetTourDb,
    UpdateTourDb,
    UpdateTripDb,
    GetTripDb,
    SaveReviewDb,
    UpdateReviewDb,
    GetReviewDb,
    DeleteReviewDb,
    
} from '../repository/Tour'

import {
    Trip, Review, TripType
} from '../domain/types';

import { bookTrip, updateTripToTour, updateCustomerTripHistory, uploadPayment, createReview, addReviewToTour, editReview, removeReviewFromTour, addTripToCustomer, refundTrip, cancelTrip, freeTrip } from '../domain/CustomerTour'
import { IdGenerator, DateGenerator } from 'domain/Tour';

export type BookTripService = (
    tourId: string,
    tripId: string,
    tripDate: Date,
    customerId: string,
    size: number,
    price: number
) => Promise<Trip>

export type UploadPaymentService = (
    tourId: string,
    tripId: string,
    customerId: string,
    slipImage: string
) => Promise<Trip>

export type AddReviewService = (
    tourId: string,
    tripId: string,
    customerId: string,
    comment: string
) => Promise<Review>

export type EditReviewService = (
    tourId: string,
    customerId: string,
    reviewId: string,
    comment: string
) => Promise<Review>

export type RemoveReviewService = (
    tourId: string,
    customerId: string,
    reviewId: string,
) => Promise<Review>

export type SeeBookHistoryService = (
    customerId: string
) => Promise<Trip[]>

export type RefundTripService = (
    tourId: string,
    tripId: string,
    customerId: string
) => Promise<Trip>

export type CancelTripService = (
    tourId: string,
    tripId: string,
    customerId: string
) => Promise<Trip>

export function bookTripService(
        getCustomerDb: GetCustomerDb,
        getTourDb: GetTourDb,
        getTripDb: GetTripDb,
        updateTourDb: UpdateTourDb,
        updateTripDb: UpdateTripDb,
        updateCustomerDb: UpdateCustomerDb,
        dateGenerator: DateGenerator

    ) : BookTripService {
    return async (
        tourId,
        tripId,
        tripDate,
        customerId,
        size,
        price
        ) => {
            const tour = await getTourDb(tourId);
            const customer = await getCustomerDb(customerId);
            const trip = await getTripDb(tripId);
            switch(trip._type){
                case TripType.UnbookedTrip :{
                    const bookedTrip = bookTrip()(
                        tripId,
                        tripDate,
                        customerId,
                        size,
                        price,
                        dateGenerator()
                    );
                    const updatedTour = updateTripToTour()(
                        tour, bookedTrip
                    );
                    const updatedCustomer = addTripToCustomer()(
                        customer, bookedTrip
                    );
                    await updateCustomerDb(updatedCustomer);
                    await updateTourDb(updatedTour);
                    await updateTripDb(bookedTrip);
                    return bookedTrip;
                } 
                default : {
                    throw new Error('Trip is already booked');
                }
            }
            
        }
    }

export function uploadPaymentService(
    getCustomerDb: GetCustomerDb,
    getTourDb: GetTourDb,
    getTripDb: GetTripDb,
    updateTourDb: UpdateTourDb,
    updateTripDb: UpdateTripDb,
    updateCustomerDb: UpdateCustomerDb,
    dateGenerator: DateGenerator
    ): UploadPaymentService {
    return async (
        tourId,
        tripId,
        customerId,
        slipUrl
    ) => {
            const tour = await getTourDb(tourId);
            const customer = await getCustomerDb(customerId);
            const trip = await getTripDb(tripId);

            switch(trip._type){
                case TripType.BookedTrip || TripType.PaidTrip:{
                    const paidTrip = uploadPayment()(
                        trip,
                        { url: slipUrl },
                        dateGenerator()
                    );

                    const updatedTour = updateTripToTour()(
                        tour, paidTrip
                    );

                    const updatedCustomer = updateCustomerTripHistory()(
                        customer, paidTrip
                    );

                    await updateCustomerDb(updatedCustomer);
                    await updateTourDb(updatedTour);
                    await updateTripDb(paidTrip);
                    return paidTrip;
                }
                default: {
                    throw new Error('Trip is not booked or paid');
                }
            }
            
        }
    }

export function addReviewService(
    getTourDb: GetTourDb,
    getTripDb: GetTripDb,
    updateTourDb: UpdateTourDb,
    saveReviewDb: SaveReviewDb,
    idGenerator: IdGenerator,
    dateGenerator: DateGenerator
): AddReviewService {
    return async (
        tourId,
        tripId,
        customerId,
        comment
    ) => {
            const tour = await getTourDb(tourId);
            const trip = await getTripDb(tripId);
            switch (trip._type){
                
                case TripType.FinishedTrip:{
                    const review = createReview(idGenerator)(
                        trip,
                        customerId,
                        comment,
                        dateGenerator()
                    );
                    
                    const updatedTour = addReviewToTour()(
                        tour, review
                    );
                    await saveReviewDb(review);
                    await updateTourDb(updatedTour);
                    return review
                }
                default: {
                    throw new Error('Your trip is not finished');
                }
            }
        }
    }

export function editReviewSrevice(
    getTourDb: GetTourDb,
    getReviewDb: GetReviewDb,
    updateTourDb: UpdateTourDb,
    updateReviewDb: UpdateReviewDb,
    dateGenerator: DateGenerator
    ) : EditReviewService {
        return async (
            tourId,
            customerId,
            reviewId,
            comment
        ) => {
            const tour = await getTourDb(tourId);
            const review = await getReviewDb(reviewId);
            
            if (review.authorId.localeCompare(customerId) == 0){
                const updatedReview = editReview()(
                    review,
                    comment,
                    dateGenerator()
                );

                const updatedTour = addReviewToTour()(
                    tour, review
                );
                await updateReviewDb(review);
                await updateTourDb(updatedTour);
                return updatedReview;
            }else{
                throw new Error('This is not your review');
            }
           
        }
    }

export function removeReviewSrevice(
    getTourDb: GetTourDb,
    getReviewDb: GetReviewDb,
    updateTourDb: UpdateTourDb,
    deleteReviewDb: DeleteReviewDb,
): RemoveReviewService {
    return async (
        tourId,
        customerId,
        reviewId,
    ) => {
        const tour = await getTourDb(tourId);
        const review = await getReviewDb(reviewId);

        switch (review.authorId) {
            case customerId: {
                const updatedTour = removeReviewFromTour()(
                    tour,review
                );

                await deleteReviewDb(review);
                await updateTourDb(updatedTour);
                return review;
            }
            default: {
                throw new Error('This is not your review');
            }
        }
    }
}

export function seeBookHistoryService(
    getCustomerDb: GetCustomerDb
): SeeBookHistoryService {
    return async (customerId) => {
        const customer = await getCustomerDb(customerId);
        return customer.tripHistory
    }
}

export function refundTripService(
    getCustomerDb: GetCustomerDb,
    getTourDb: GetTourDb,
    getTripDb: GetTripDb,
    updateTourDb: UpdateTourDb,
    updateTripDb: UpdateTripDb,
    updateCustomerDb: UpdateCustomerDb,
    dateGenerator: DateGenerator
): RefundTripService {
    return async (
        tourId,
        tripId,
        customerId) => {
        const tour = await getTourDb(tourId);
        const customer = await getCustomerDb(customerId);
        const trip = await getTripDb(tripId);
        switch (trip._type) {
            case TripType.ApprovedTrip: {
                const refundRequestedTrip = refundTrip()(
                    trip,
                    dateGenerator()
                );
                const updatedTour = updateTripToTour()(
                    tour, refundRequestedTrip
                );
                const updatedCustomer = addTripToCustomer()(
                    customer, refundRequestedTrip
                );
                await updateCustomerDb(updatedCustomer);
                await updateTourDb(updatedTour);
                await updateTripDb(refundRequestedTrip);
                return refundRequestedTrip;
            }
            default: {
                throw new Error('Your Payment has not been approve')
            }
        }
    }
}

export function cancelTripService(
    getCustomerDb: GetCustomerDb,
    getTourDb: GetTourDb,
    getTripDb: GetTripDb,
    updateTourDb: UpdateTourDb,
    updateTripDb: UpdateTripDb,
    updateCustomerDb: UpdateCustomerDb,
    dateGenerator: DateGenerator
): CancelTripService {
    return async (
        tourId,
        tripId,
        customerId) => {
        const tour = await getTourDb(tourId);
        const customer = await getCustomerDb(customerId);
        const trip = await getTripDb(tripId);
        switch (trip._type) {
            case TripType.PaidTrip || TripType.BookedTrip : {
                const cancelledTrip = cancelTrip()(
                    trip,
                    dateGenerator()
                );

                const unbookedTrip = freeTrip()(cancelledTrip);

                const updatedTour = updateTripToTour()(
                    tour, unbookedTrip
                );
                const updatedCustomer = addTripToCustomer()(
                    customer, cancelledTrip
                );
                await updateCustomerDb(updatedCustomer);
                await updateTourDb(updatedTour);
                await updateTripDb(unbookedTrip);
                return cancelledTrip;
            }
            default: {
                throw new Error('Your Payment has not been approve')
            }
        }
    }
}