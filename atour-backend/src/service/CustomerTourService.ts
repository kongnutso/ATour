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

import { bookTrip, updateTripToTour, updateCustomerTripHistory, uploadPayment, createReview, addReviewToTour, editReview, removeReviewFromTour } from '../domain/CustomerTour'
import { IdGenerator } from 'domain/Tour';

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

export function bookTripService(
        getCustomerDb: GetCustomerDb,
        getTourDb: GetTourDb,
        updateTourDb: UpdateTourDb,
        updateTripDb: UpdateTripDb,
        updateCustomerDb: UpdateCustomerDb

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
            const trip = bookTrip()(
                tripId,
                tripDate,
                customerId,
                size,
                price,
                new Date()
            );
            const updatedTour = updateTripToTour()(
                tour,trip
            );
            const updatedCustomer = updateCustomerTripHistory()(
                customer,trip
            );
            await updateCustomerDb(updatedCustomer);
            await updateTourDb(updatedTour);
            await updateTripDb(trip);
            return trip;
        }
    }

export function uploadPaymentService(
    getCustomerDb: GetCustomerDb,
    getTourDb: GetTourDb,
    getTripDb: GetTripDb,
    updateTourDb: UpdateTourDb,
    updateTripDb: UpdateTripDb,
    updateCustomerDb: UpdateCustomerDb
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

            const paidTrip = uploadPayment()(
                trip,
                {url: slipUrl},
                new Date()
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
    }

export function addReviewService(
    getTourDb: GetTourDb,
    getTripDb: GetTripDb,
    updateTourDb: UpdateTourDb,
    saveReviewDb: SaveReviewDb,
    idGenerator: IdGenerator
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
                        new Date()
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
    ) : EditReviewService {
        return async (
            tourId,
            customerId,
            reviewId,
            comment
        ) => {
            const tour = await getTourDb(tourId);
            const review = await getReviewDb(reviewId);

            switch (review.authorId){
                case customerId :{
                    const updatedReview = editReview()(
                        review,
                        comment,
                        new Date()
                    );
                    
                    const updatedTour = addReviewToTour()(
                        tour, review
                    );
                    await updateReviewDb(review);
                    await updateTourDb(updatedTour);
                    return updatedReview;
                }
                default: {
                    throw new Error('This is not your review');
                }
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