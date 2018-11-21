import axios from "axios";
import { isNullOrUndefined } from "util";

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const GUIDE_LOGIN_SUCCESS = "GUIDE_LOGIN_SUCCESS";
export const LOGIN_FAILED = "LOGIN_FAILED";

function IsNullOrUndefined(x) {
  if (x === undefined) {
    return true;
  }
  if (x === null) {
    return true;
  }
  return false;
}

export function login(userName, password, role) {
  return async dispatch => {
    try {
      if (role) {
        const res = await axios
          .post("http://localhost:3000/customer/login", {
            userName,
            password
          })
          .then(res => {
            return res.data;
          });
        if (res.error) {
          return dispatch({
            type: LOGIN_FAILED
          });
        } else {
          console.log("res: ", res);
          return dispatch({
            type: LOGIN_SUCCESS,
            payload: { userName, role: "Customer", token: res }
          });
        }
      } else {
        const res = await axios
          .post("http://localhost:3000/guide/login", {
            userName,
            password
          })
          .then(res => {
            return res.data;
          });
        console.log(res);
        if (res === "Cannot read property 'guideId' of null") {
          return dispatch({
            type: LOGIN_FAILED
          });
        } else {
          console.log("res: ", res);
          return dispatch({
            type: GUIDE_LOGIN_SUCCESS,
            payload: {
              userName,
              role: "Guide",
              token: res.token,
              guideInfo: res.guide
            }
          });
        }
      }
    } catch (e) {}
  };
}

export const LOGOUT = "LOGOUT";
export function logout() {
  return {
    type: LOGOUT
  };
}

export const RESIZE_WINDOW = "RESIZE_WIDNOW";
export function resizeWindow(width) {
  return {
    type: RESIZE_WINDOW,
    payload: width
  };
}
export const CLEAR_ERROR = "CLEAR_ERROR";
export function clearError() {
  return { type: "CLEAR_ERROR" };
}
