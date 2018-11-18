import {
  Trip,
  ApprovedTrip,
  TripType,
  RefundedTrip,
  Guide,
  ApprovedGuide,
  GuideType,
  ApprovalStatus,
  BadGuide
} from './types'

type ApproveGuide = (g: Guide) => ApprovedGuide

export function approveGuide(): ApproveGuide {
  return (guide: Guide) => {
    const approvedGuide: ApprovedGuide = {
      _type: GuideType.ApprovedGuide,
      guideId: guide.guideId,
      userName: guide.userName,
      password: guide.password,
      personalId: guide.personalId,
      bankAccountNumber: guide.bankAccountNumber,
      bankName: guide.bankName,
      email: guide.email,
      profile: guide.profile,
      approvalStatus: ApprovalStatus.Approved,
      availableDate: [],
      dealtTrips: [],
      publishedTours: []
    }
    return approvedGuide;
  }
}

type MarkBadGuide = (g: Guide) => BadGuide

export function markBadGuide(): MarkBadGuide {
  return (guide: Guide) => {
    switch (guide._type) {
      case GuideType.ApprovedGuide: {
        const badGuide: BadGuide = {
          _type: GuideType.BadGuide,
          guideId: guide.guideId,
          userName: guide.userName,
          password: guide.password,
          personalId: guide.personalId,
          bankAccountNumber: guide.bankAccountNumber,
          bankName: guide.bankName,
          email: guide.email,
          profile: guide.profile,
          approvalStatus: guide.approvalStatus,
          availableDate: guide.availableDate,
          dealtTrips: guide.dealtTrips,
          publishedTours: guide.publishedTours
        }
        return badGuide;
      }
      default: {
        throw new Error('Guide must be approved to be marked bad');
      }
    }
  }
}

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

type RefundTrip = (t: Trip, d: Date) => RefundedTrip;

export function refundTrip(): RefundTrip {
  return (
    trip,
    refundDate
  ) => {
    switch (trip._type) {
      case TripType.RefundRequestedTrip: {
        const refundedTrip: RefundedTrip = {
          _type: TripType.RefundedTrip,
          tripId: trip.tripId,
          tripDate: trip.tripDate,
          bookInfo: trip.bookInfo,
          paidDate: trip.paidDate,
          slipImages: trip.slipImages,
          approveDate: trip.approveDate,
          refundRequestDate:  trip.refundRequestDate,
          refundDate: refundDate
        };
        return refundedTrip;
      }
      default: {
        throw new Error('Trip is refund requested');
      }
    }
  }
}