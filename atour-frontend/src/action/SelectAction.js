import axios from "axios";

export const SELECT_TOUR = "SELECT_TOUR";
export function selectTour(tour) {
  return async dispatch => {
    try {
      const res = await axios
        .post("http://localhost:3000/customer/getTourReview", {
          tourId: tour.tourId
        })
        .then(res => {
          return res.data;
        });
      return dispatch({ type: SELECT_TOUR, payload: res });
    } catch (e) {}
  };
}

export const SELECT_GUIDE = "SELECT_GUIDE";
export function selectGuide(guide) {
  return { type: SELECT_GUIDE, payload: guide };
}
