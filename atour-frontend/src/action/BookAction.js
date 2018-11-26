import axios from "axios";
import { APPROVETRIP } from "../utils/TripType";

export const BOOK_TRIP = "BOOK_TRIP";
export const BOOK_TRIP_ERROR = "BOOK_TRIP_ERROR";
export const CLEAR_BOOK_MESSAGE = "  CLEAR_BOOK_MESSAGE";

export function clearBookMessage() {
  return { type: CLEAR_BOOK_MESSAGE };
}

export function bookTrip(
  tourName,
  tourId,
  tripInfo,
  price,
  size,
  customerId,
  guideName
) {
  return async dispatch => {
    try {
      const req = {
        tourName: tourName,
        tourId: tourId,
        tripId: tripInfo.tripId,
        tripDate: tripInfo.tripDate,
        customerId,
        size,
        price,
        guideName
      };
      const res = await axios
        .post("http://localhost:3000/customer/bookTrip", req)
        .then(res => {
          return res.data;
        });
      if (res.error) {
        return dispatch({
          type: BOOK_TRIP_ERROR,
          payload: { message: res.error }
        });
      } else {
        const payload = await getTrip(res.tripId);
        return dispatch({
          type: BOOK_TRIP,
          payload
        });
      }
    } catch (e) {
      console.log(e);
    }
  };
}

async function getTrip(tripId) {
  try {
    const res = await axios
      .get(`http://localhost:3000/trip/${tripId}`)
      .then(res => {
        return res.data;
      });
    console.log(res);
    const payload = {
      ...res.bookInfo,
      guideId: res.guide.guideId,
      tourName: res.tourName,
      tripDate: res.tripDate,
      _type: res._type,
      tripId: res.tripId,
      tourId: res.tourId,
      uploadedFileDate: res.paidDate,
      slip: res.slipImages,
      review: res.review
    };
    return payload;
  } catch (e) {
    console.log(e);
  }
}

async function finishTrip(tripId) {
  try {
    const res = await axios
      .post("http://localhost:3000/customer/finishTrip", { tripId })
      .then(res => {
        return res.data;
      });
    console.log(res);
    const payload = {
      ...res.bookInfo,
      tourName: res.tourName,
      tripDate: res.tripDate,
      _type: res._type,
      tripId: res.tripId,
      tourId: res.tourId,
      uploadedFileDate: res.paidDate,
      slip: res.slipImages
    };
    console.log(payload);
    return payload;
  } catch (e) {
    console.log(e);
  }
}

export const SELECT_BOOKED_TRIP = "SELECT_BOOKED_TRIP";
export function selectBookedTrip(tripId, tripDate, _type) {
  return async dispatch => {
    try {
      const finish =
        new Date() - new Date(tripDate) > 0 && _type === APPROVETRIP;
      const payload = finish ? await finishTrip(tripId) : await getTrip(tripId);
      return dispatch({
        type: SELECT_BOOKED_TRIP,
        payload
      });
    } catch (e) {
      console.log(e);
    }
  };
}

export const SET_IMAGE_SLIP = "SET_IMAGE_SLIP";
export function setImageSlip(slipUrl, tripId, tourId, customerId) {
  return async dispatch => {
    try {
      if (tripId) {
        const res = await axios
          .post("http://localhost:3000/customer/uploadPayment", {
            tourId,
            tripId,
            customerId,
            slipUrl
          })
          .then(res => {
            return res.data;
          });
        return dispatch({
          type: SET_IMAGE_SLIP,
          payload: {
            uploadedFileDate: res.paidDate,
            _type: res._type,
            slip: res.slipImages
          }
        });
      } else {
        return dispatch({ type: "INVALID" });
      }
    } catch (e) {}
  };
}

export const SEE_BOOK_HISTORY = "SEE_BOOK_HISTORY";
export function seeBookHistory(customerId) {
  return async dispatch => {
    try {
      if (customerId) {
        const tour = await axios
          .post("http://localhost:3000/customer/seeBookHistory", { customerId })
          .then(res => {
            return res.data;
          });
        return dispatch({
          type: SEE_BOOK_HISTORY,
          payload: tour
        });
      } else {
        return dispatch({ type: "INVALID" });
      }
    } catch (e) {}
  };
}

export const CANCEL_TRIP = "CANCEL_TRIP";
export function cancelTrip(tourId, tripId, customerId) {
  return async dispatch => {
    try {
      if (customerId) {
        const cancel = await axios
          .post("http://localhost:3000/customer/cancelTrip", {
            tourId: tourId,
            tripId: tripId,
            customerId: customerId
          })
          .then(res => {
            return res.data;
          });
        return dispatch({
          type: CANCEL_TRIP,
          payload: cancel
        });
      } else {
        return dispatch({ type: "INVALID" });
      }
    } catch (e) {}
  };
}

export const REFUND_TRIP = "REFUND_TRIP";
export function refundTrip(tourId, tripId, customerId) {
  return async dispatch => {
    try {
      if (customerId) {
        const refund = await axios
          .post("http://localhost:3000/customer/refundTrip", {
            tourId: tourId,
            tripId: tripId,
            customerId: customerId
          })
          .then(res => {
            return res.data;
          });
        return dispatch({
          type: REFUND_TRIP,
          payload: refund
        });
      } else {
        return dispatch({ type: "INVALID" });
      }
    } catch (e) {
      console.log(e);
    }
  };
}

export const CHANGE_REVIEW = "CHANGE_REVIEW";
export function changeReview(tourId, tripId, customerId, comment, isNew) {
  return async dispatch => {
    console.log(tourId, tripId, customerId, comment, isNew);
    try {
      if (customerId) {
        const review = await axios
          .post(
            "http://localhost:3000/customer/" +
              (isNew ? "addReview" : "editReview"),
            {
              comment,
              tourId,
              tripId,
              customerId
            }
          )
          .then(res => {
            return res.data;
          });
        console.log(review);
        return dispatch({
          type: CHANGE_REVIEW,
          payload: { review }
        });
      } else {
        return dispatch({ type: "INVALID" });
      }
    } catch (e) {
      console.log(e);
    }
  };
}

export const DELETE_REVIEW = "DELETE_REVIEW";
export function deleteReview(tourId, tripId, customerId, reviewId) {
  return async dispatch => {
    try {
      if (customerId) {
        const review = await axios
          .post("http://localhost:3000/customer/removeReview", {
            reviewId,
            tourId,
            tripId,
            customerId
          })
          .then(res => {
            return res.data;
          });
        return dispatch({
          type: CHANGE_REVIEW,
          payload: { review: {} }
        });
      } else {
        return dispatch({ type: "INVALID" });
      }
    } catch (e) {
      console.log(e);
    }
  };
}
