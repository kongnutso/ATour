import axios from "axios";
import { isNullOrUndefined } from "util";

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
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
        if (
          res.error ||
          res.data == "Cannot read property 'guideId' of null" ||
          IsNullOrUndefined(res.data)
        ) {
          console.log("Login failed");
          return dispatch({
            type: LOGIN_FAILED
          });
        } else {
          return dispatch({
            type: LOGIN_SUCCESS,
            payload: { userName, role: "Guide", token: res }
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
