import axios from "axios";
import { API_ENDPOINT } from "../utils/utils";
export const ADD_DEALT_TRIPS = "ADD_DEALT_TRIPS";

export function getDealtTrips(value) {
  return async dispatch => {
    try {
      const url = "http://" + API_ENDPOINT + "/trip/" + value;
      const res = await axios.get(url).then(res => {
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
