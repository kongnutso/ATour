import {
    GetCustomerDb, UpdateCustomerDb
} from '../repository/Customer';

import {
    GetTourDb,
    UpdateTourDb,
    UpdateTripDb,
    
} from '../repository/Tour'

import {
    Trip
} from '../domain/types';

import { bookTrip, updateTripToTour, updateCustomerTripHistory } from '../domain/CustomerTour'
// import { IdGenerator } from 'domain/Tour';

export type BookTripService = (
    tourId: string,
    tripId: string,
    tripDate: Date,
    customerId: string,
    size: number,
    price: number
) => Promise<Trip>

export function bookTripService(
        getCustomerDB: GetCustomerDb,
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
            const customer = await getCustomerDB(customerId);
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