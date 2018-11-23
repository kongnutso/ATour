import {
  GetGuideDb, 
  SaveGuideDb
} from '../repository/Guide';
import { GetCustomerDb, UpdateCustomerDb} from '../repository/Customer';
import { Guide, Trip } from '../domain/types';
import { GetTourDb, GetTripDb, UpdateTourDb, UpdateTripDb, GetRefundTripDb, GetPendingPaymentTripDb } from '../repository/Tour';
import { DateGenerator } from '../domain/Tour';
import { approveTrip, refundTrip, approveGuide, markBadGuide, rejectTrip, rejectRefundRequest, rejectGuide } from '../domain/Admin';
import { updateTripToTour, updateCustomerTripHistory } from '../domain/CustomerTour';

export type ApproveGuideService = (
  guideId: string
) => Promise<Guide>;

export type RejectGuideService = (
  guideId: string
) => Promise<Guide>;

export type GetRefundRequests = () => Promise<Trip[]>

export type ApproveRefundService = (
  tourId: string,
  tripId: string,
  customerId: string
) => Promise<Trip>;

export type RejectRefundService = (
  tourId: string,
  tripId: string,
  customerId: string
) => Promise<Trip>;

export type SearchGuideService = (
  guideId: string
) => Promise<Guide[]>;

export type GetPendingPayments = () => Promise<Trip[]>

export type ApprovePaymentService = (
  tourId: string,
  tripId: string,
  customerId: string
) => Promise<Trip>;

export type RejectPaymentService = (
  tourId: string,
  tripId: string,
  customerId: string
) => Promise<Trip>;

export type MarkBadGuideService = (
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

export function rejectGuideService(getGuide: GetGuideDb, saveGuide: SaveGuideDb): RejectGuideService {
  return async (guideId) => {
    const guide = await getGuide(guideId)
    const rejectedGuide = await rejectGuide()(guide);
    await saveGuide(rejectedGuide);
    return rejectedGuide;
  };
}

export function getRefundRequests(getRefundTripDb: GetRefundTripDb): GetRefundRequests {
  return async () => {
    const results = await getRefundTripDb();
    return results
  }
}

export function approveRefundService(
  getCustomerDb: GetCustomerDb,
  getTourDb: GetTourDb,
  getTripDb: GetTripDb,
  updateTourDb: UpdateTourDb,
  updateTripDb: UpdateTripDb,
  updateCustomerDb: UpdateCustomerDb,
  dateGenerator: DateGenerator
): ApproveRefundService {
  return async (
    tourId,
    tripId,
    customerId
  ) => {
    const requestedTrip = await getTripDb(tripId);
    const tour = await getTourDb(tourId);
    const customer = await getCustomerDb(customerId);

    const refundedTrip = await refundTrip()(
      requestedTrip, 
      dateGenerator()
    );
    const updatedTour = await updateTripToTour()(
      tour, 
      refundedTrip
    );
    const updatedCustomer = await updateCustomerTripHistory()(
      customer, 
      refundedTrip
    );

    await updateCustomerDb(updatedCustomer);
    await updateTourDb(updatedTour);
    await updateTripDb(refundedTrip);

    return refundedTrip;
  }
}

export function rejectRefundService(
  getCustomerDb: GetCustomerDb,
  getTourDb: GetTourDb,
  getTripDb: GetTripDb,
  updateTourDb: UpdateTourDb,
  updateTripDb: UpdateTripDb,
  updateCustomerDb: UpdateCustomerDb
): RejectRefundService {
  return async (
    tourId,
    tripId,
    customerId
  ) => {
    const requestedTrip = await getTripDb(tripId);
    const tour = await getTourDb(tourId);
    const customer = await getCustomerDb(customerId);

    const notRefundedTrip = await rejectRefundRequest()(
      requestedTrip
    );
    const updatedTour = await updateTripToTour()(
      tour, 
      notRefundedTrip
    );
    const updatedCustomer = await updateCustomerTripHistory()(
      customer, 
      notRefundedTrip
    );

    await updateCustomerDb(updatedCustomer);
    await updateTourDb(updatedTour);
    await updateTripDb(notRefundedTrip);

    return notRefundedTrip;
  }
}


export function getPendingPayments(getPendingPaymentTripDb: GetPendingPaymentTripDb): GetPendingPayments {
  return async () => {
    const results = await getPendingPaymentTripDb();
    return results
  }
}

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

export function rejectPaymentService(
  getCustomerDb: GetCustomerDb,
  getTourDb: GetTourDb,
  getTripDb: GetTripDb,
  updateTourDb: UpdateTourDb,
  updateTripDb: UpdateTripDb,
  updateCustomerDb: UpdateCustomerDb
): RejectPaymentService {
  return async (
    tourId,
    tripId,
    customerId
  ) => {
    const paidTrip = await getTripDb(tripId);
    const tour = await getTourDb(tourId);
    const customer = await getCustomerDb(customerId);

    const rejectedTrip = await rejectTrip()(
      paidTrip
    );
    const updatedTour = await updateTripToTour()(
      tour, 
      rejectedTrip
    );
    const updatedCustomer = await updateCustomerTripHistory()(
      customer, 
      rejectedTrip
    );

    await updateCustomerDb(updatedCustomer);
    await updateTourDb(updatedTour);
    await updateTripDb(rejectedTrip);

    return rejectedTrip;
  }
}

export function markBadGuideService(getGuide: GetGuideDb, saveGuide: SaveGuideDb): MarkBadGuideService {
  return async (guideId) => {
    const guide = await getGuide(guideId)
    const badGuide = await markBadGuide()(guide);
    await saveGuide(badGuide);
    return badGuide;
  };
}

