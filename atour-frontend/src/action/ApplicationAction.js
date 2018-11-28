import axios from "axios";
import { isNullOrUndefined } from "util";
import { API_ENDPOINT } from "../utils/utils";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const GUIDE_LOGIN_SUCCESS = "GUIDE_LOGIN_SUCCESS";
export const ADMIN_LOGIN_SUCCESS = "ADMIN_LOGIN_SUCCESS";
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
      if (role === "Customer") {
        const res = await axios
          .post("http://" + API_ENDPOINT + "/customer/login", {
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
          return dispatch({
            type: LOGIN_SUCCESS,
            payload: { userName, role: "Customer", token: res }
          });
        }
      } else if (role === "Guide") {
        const res = await axios
          .post("http://" + API_ENDPOINT + "/guide/login", {
            userName,
            password
          })
          .then(res => {
            return res.data;
          });
        if (res === "Cannot read property 'guideId' of null") {
          return dispatch({
            type: LOGIN_FAILED
          });
        } else {
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
      } else {
        if (userName === "admin" && password === "12345") {
          return dispatch({
            type: ADMIN_LOGIN_SUCCESS,
            payload: {
              userName: "Admin",
              role: "Admin"
            }
          });
        } else {
          return dispatch({
            type: LOGIN_FAILED
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
