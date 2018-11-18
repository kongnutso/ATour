import {
  GetGuideDb, 
  SaveGuideDb
} from '../repository/Guide';
import { approveGuide, markBadGuide } from '../domain/Guide';
import { GetCustomerDb } from '../repository/Customer';
import { Customer, Guide } from 'domain/types';

export type ApproveGuideService = (
  guideId: string
) => Promise<void>;

export function approveGuideService(getGuide: GetGuideDb, saveGuide: SaveGuideDb): ApproveGuideService {
  return async (guideId) => {
    const guide = await getGuide(guideId)
    const approvedGuide = await approveGuide()(guide);
    await saveGuide(approvedGuide);
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
  tripId: string
) => Promise<void>;

export type MarkBadGuideService = (
  guideId: string
) => Promise<void>;

export function markBadGuideService(getGuide: GetGuideDb, saveGuide: SaveGuideDb): MarkBadGuideService {
  return async (guideId) => {
    const guide = await getGuide(guideId)
    const badGuide = await markBadGuide()(guide);
    await saveGuide(badGuide);
  };
}

