import {
  GetGuideDb, 
  SaveGuideDb
} from '../repository/Guide';
import { approveGuide, markBadGuide } from '../domain/Guide';
import { GetCustomerDb, UpdateCustomerDb, saveCustomer } from '../repository/Customer';
import { Customer, Guide, Trip } from 'domain/types';
import { GetTourDb, GetTripDb, UpdateTourDb, UpdateTripDb } from '../repository/Tour';
import { DateGenerator } from '../domain/Tour';
import { approveTrip } from 'domain/Admin';
import { updateTripToTour, updateCustomerTripHistory } from 'domain/CustomerTour';

export type ApproveGuideService = (
  guideId: string
) => Promise<Guide>;

export function approveGuideService(getGuide: GetGuideDb, saveGuide: SaveGuideDb): ApproveGuideService {
  return async (guideId) => {
    const guide = await getGuide(guideId)
    const approvedGuide = await approveGuide()(guide);
    await saveGuide(approvedGuide);
    return approvedGuide;
  };
}

export type ApproveRefundService = (
  tripId: string
) => Promise<void>;

export type SearchCustomerService = (
  customerId: string
) => Promise<Customer>;

export function searchCustomerService(
  getCustomer: GetCustomerDb
): SearchCustomerService {
  return async (
    customerId: string
  ) => {
    return await getCustomer(customerId);
  }
}

export type SearchGuideService = (
  guideId: string
) => Promise<Guide[]>;

export type ApprovePaymentService = (
  tourId: string,
  tripId: string,
  customerId: string
) => Promise<Trip>;

export function approvePaymentService(
  getCustomerDb: GetCustomerDb,
  getTourDb: GetTourDb,
  getTripDb: GetTripDb,
  updateTourDb: UpdateTourDb,
  updateTripDb: UpdateTripDb,
  updateCustomerDb: UpdateCustomerDb,
  dateGenerator: DateGenerator
): ApprovePaymentService {
  return async (
    tourId,
    tripId,
    customerId
  ) => {
    const paidTrip = await getTripDb(tripId);
    const tour = await getTourDb(tourId);
    const customer = await getCustomerDb(customerId);

    const approvedTrip = await approveTrip()(
      paidTrip, 
      dateGenerator()
    );
    const updatedTour = await updateTripToTour()(
      tour, 
      approvedTrip
    );
    const updatedCustomer = await updateCustomerTripHistory()(
      customer, 
      approvedTrip
    );

    await updateCustomerDb(updatedCustomer);
    await updateTourDb(updatedTour);
    await updateTripDb(approvedTrip);

    return approvedTrip;
  }
}

export type MarkBadGuideService = (
  guideId: string
) => Promise<Guide>;

export function markBadGuideService(getGuide: GetGuideDb, saveGuide: SaveGuideDb): MarkBadGuideService {
  return async (guideId) => {
    const guide = await getGuide(guideId)
    const badGuide = await markBadGuide()(guide);
    await saveGuide(badGuide);
    return badGuide;
  };
}

