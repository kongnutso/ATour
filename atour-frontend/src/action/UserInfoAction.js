import axios from "axios";

export const EDIT_USER_INFO = "EDIT_USER_INFO";
export function editUserInfo(userInfo, token) {
  return async dispatch => {
    try {
      const payload = {
        userName: userInfo.userName,
        token,
        ...userInfo
      };
      const res = await axios
        .post("http://localhost:3000/customer/editProfile", payload)
        .then(res => {
          return res.data;
        });
      return dispatch({
        type: EDIT_USER_INFO,
        payload: {
          token,
          email: userInfo.email,
          phoneNumber: res.phoneNumber
        }
      });
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
        .post("http://localhost:3000/customer/getProfile", { userName, token })
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
        const guideData = await axios
          .post("http://localhost:3000/guide/guideid", guideId)
          .then(res => {
            return res.data;
          });
        const guideInfo = {
          guideId: guideData.guideId,
          userName: guideData.userName,
          password: guideData.password,
          personalId: guideData.personalId,
          email: guideData.email,
          firstName: guideData.profile.firstName,
          lastName: guideData.profile.lastName,
          birthDate: guideData.profile.birthDate,
          gender: guideData.profile.gender,
          phoneNumber: guideData.profile.phoneNumber,
          bankAccountNumber: guideData.bankAccountNumber,
          bankName: guideData.bankName,
          approvalStatus: guideData.approvalStatus,
          availableDate: guideData.availableDate,
          dealtTrips: guideData.dealtTrips,
          publishedTours: guideData.publishedTours
        };
        return dispatch({
          type: GET_GUIDE_INFO,
          payload: guideInfo
        });
      } else return dispatch({ type: "INVALID" });
    } catch (e) {}
  };
}

// export const

export const EDIT_PROFILE = "EDIT_PROFILE";
export function editProfile() {
  return { type: EDIT_PROFILE };
}
export const VIEW_PROFILE = "VIEW_PROFILE";
export function viewProfile() {
  return { type: VIEW_PROFILE };
}
