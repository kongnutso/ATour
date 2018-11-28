import axios from "axios";
import { API_ENDPOINT } from "../utils/utils";

export const EDIT_USER_INFO = "EDIT_USER_INFO";
export const EDIT_GUIDE_USER_INFO = "EDIT_GUIDE_USER_INFO";
export function editUserInfo(userInfo, token, role) {
  return async dispatch => {
    try {
      if (role === "Customer") {
        const payload = {
          customerId: userInfo.customerId,
          token,
          ...userInfo
        };
        const res = await axios
          .post("http://" + API_ENDPOINT + "/customer/editProfile", payload)
          .then(res => {
            return res.data;
          });
        return dispatch({
          type: EDIT_USER_INFO,
          payload: {
            email: res.email,
            phoneNumber: res.profile.phoneNumber,
            profileImageUrl: res.profile.profileImageUrl
          }
        });
      } else if (role === "Guide") {
        const payload = {
          ...userInfo
        };
        const res = await axios
          .post(
            "http://" + API_ENDPOINT + "/guide/" + userInfo.guideId,
            payload
          )
          .then(res => {
            return res.data;
          });
        if (res.error) {
          return dispatch({ type: "INVALID" });
        }
        return dispatch({
          type: EDIT_GUIDE_USER_INFO,
          payload: {
            guideInfo: { ...res, ...res.profile }
          }
        });
      }
    } catch (e) {
      console.log(e);
    }
  };
}

export const GET_USER_INFO = "GET_USER_INFO";
export function getUserInfo(userName, token) {
  return async dispatch => {
    try {
      const userInfo = await axios
        .post("http://" + API_ENDPOINT + "/customer/getProfile", {
          userName,
          token
        })
        .then(res => {
          return res.data;
        });
      return dispatch({
        type: GET_USER_INFO,
        payload: userInfo
      });
    } catch (e) {}
  };
}
export const GET_GUIDE_INFO = "GET_GUIDE_INFO";
export function getGuideInfo(guideId) {
  return async dispatch => {
    try {
      if (guideId) {
        const userInfo = await axios
          .get("http://" + API_ENDPOINT + "/guide/" + guideId)
          .then(res => {
            return res.data;
          });
        const guideInfo = {
          ...userInfo,
          ...userInfo.profile
        };
        return dispatch({
          type: GET_GUIDE_INFO,
          payload: { guideInfo }
        });
      } else return dispatch({ type: "INVALID" });
    } catch (e) {
      console.log(e);
    }
  };
}

export const UPDATED = "UPDATED";
export function updated() {
  return { type: UPDATED };
}

export const EDIT_PROFILE = "EDIT_PROFILE";
export function editProfile() {
  return { type: EDIT_PROFILE };
}
export const VIEW_PROFILE = "VIEW_PROFILE";
export function viewProfile() {
  return { type: VIEW_PROFILE };
}
