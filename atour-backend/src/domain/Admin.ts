import {
  Trip,
  ApprovedTrip,
  TripType,
  RefundedTrip,
  Guide,
  ApprovedGuide,
  GuideType,
  ApprovalStatus,
  BadGuide,
  RejectedPaidTrip,
  RejectedGuide
} from './types';

type ApproveGuide = (g: Guide) => ApprovedGuide;

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
    };
    return approvedGuide;
  };
}

type RejectGuide = (g: Guide) => RejectedGuide;

export function rejectGuide(): RejectGuide {
  return (guide: Guide) => {
    const rejectedGuide: RejectedGuide = {
      _type: GuideType.RejectedGuide,
      guideId: guide.guideId,
      userName: guide.userName,
      password: guide.password,
      personalId: guide.personalId,
      bankAccountNumber: guide.bankAccountNumber,
      bankName: guide.bankName,
      email: guide.email,
      profile: guide.profile,
      approvalStatus: ApprovalStatus.NotApprove
    };
    return rejectedGuide;
  };
}

type MarkBadGuide = (g: Guide) => BadGuide;

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
        };
        return badGuide;
      }
      default: {
        throw new Error('Guide must be approved to be marked bad');
      }
    }
  };
}

type ApproveTrip = (t: Trip, d: Date) => ApprovedTrip;

export function approveTrip(): ApproveTrip {
  return (trip, approveDate) => {
    switch (trip._type) {
      case TripType.PaidTrip: {
        const approvedTrip: ApprovedTrip = {
          ...trip,
          _type: TripType.ApprovedTrip,
          approveDate: approveDate
        };
        return approvedTrip;
      }
      default: {
        throw new Error('Trip is not paid');
      }
    }
  };
}

type RejectTrip = (t: Trip) => RejectedPaidTrip;

export function rejectTrip(): RejectTrip {
  return (trip) => {
    switch (trip._type) {
      case TripType.PaidTrip: {
        const rejectedTrip: RejectedPaidTrip = {
          ...trip,
          _type: TripType.RejectedPaidTrip
        };
        return rejectedTrip;
      }
      default: {
        throw new Error('Trip is not paid');
      }
    }
  };
}

type RefundTrip = (t: Trip, d: Date) => RefundedTrip;

export function refundTrip(): RefundTrip {
  return (trip, refundDate) => {
    switch (trip._type) {
      case TripType.RefundRequestedTrip: {
        const refundedTrip: RefundedTrip = {
          ...trip,
          _type: TripType.RefundedTrip,
          refundDate: refundDate
        };
        return refundedTrip;
      }
      default: {
        throw new Error('Trip is not refund requested');
      }
    }
  };
}

type RejectRefundTrip = (t: Trip) => ApprovedTrip;

export function rejectRefundRequest(): RejectRefundTrip {
  return (trip) => {
    switch (trip._type) {
      case TripType.RefundRequestedTrip: {
        const approvedTrip: ApprovedTrip = {
          _type: TripType.ApprovedTrip,
          tripId: trip.tripId,
          tripDate: trip.tripDate,
          bookInfo: trip.bookInfo,
          paidDate: trip.paidDate,
          slipImages: trip.slipImages,
          approveDate: trip.approveDate,
          tourId: trip.tourId,
          tourName: trip.tourName
        };
        return approvedTrip;
      }
      default: {
        throw new Error('Trip is refund requested');
      }
    }
  };
}
