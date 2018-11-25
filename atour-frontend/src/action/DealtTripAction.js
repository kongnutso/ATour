import axios from "axios";
export const ADD_DEALT_TRIPS = "ADD_DEALT_TRIPS";

export function getDealtTrips(value) {
  return async dispatch => {
    try {
      const url = "http://localhost:3000/trip/" + value;
      console.log("Sending: ", url);
      const res = await axios.get(url).then(res => {
        console.log("Received: ", res);
        return res.data;
      });
      return dispatch({
        type: ADD_DEALT_TRIPS,
        payload: {
          dealtTrips: res.data
        }
      });
    } catch (e) {}
  };
}
