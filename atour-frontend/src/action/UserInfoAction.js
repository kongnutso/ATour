import axios from 'axios';

export const EDIT_USER_INFO = 'EDIT_USER_INFO';
export function editUserInfo(userInfo, token) {
  return async dispatch => {
    try {
      const payload = {
        userName: userInfo.userName,
        token,
        ...userInfo
      };
      const res = await axios
        .post('http://localhost:3000/customer/editProfile', payload)
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

export const GET_USER_INFO = 'GET_USER_INFO';
export function getUserInfo(userName, token) {
  return async dispatch => {
    try {
      const userInfo = await axios
        .post('http://localhost:3000/customer/getProfile', { userName, token })
        .then(res => {
          console.log('getUserInfo', res.data);
          return res.data;
        });
      return dispatch({
        type: GET_USER_INFO,
        payload: userInfo
      });
    } catch (e) {}
  };
}

export const GET_GUIDE_INFO = 'GET_GUIDE_INFO';
export function getGuideInfo(guideId) {
  return async dispatch => {
    try {
      if (guideId) {
        const userInfo = await axios
          .post('http://localhost:3000/guide/guideid', guideId)
          .then(res => {
            return res.data;
          });
        const guideInfo = {
          guideId: userInfo.guideId,
          userName: userInfo.userName,
          password: userInfo.password,
          personalId: userInfo.personalId,
          email: userInfo.email,
          firstName: userInfo.profile.firstName,
          lastName: userInfo.profile.lastName,
          birthDate: userInfo.profile.birthDate,
          gender: userInfo.profile.gender,
          phoneNumber: userInfo.profile.phoneNumber,
          bankAccountNumber: userInfo.bankAccountNumber,
          bankName: userInfo.bankName,
          approvalStatus: userInfo.approvalStatus,
          availableDate: userInfo.availableDate,
          dealtTrips: userInfo.dealtTrips,
          publishedTours: userInfo.publishedTours
        };
        console.log('RECEIVED: ', userInfo);
        return dispatch({
          type: GET_GUIDE_INFO,
          payload: { guideInfo }
        });
      } else return dispatch({ type: 'INVALID' });
    } catch (e) {}
  };
}

// export const

export const EDIT_PROFILE = 'EDIT_PROFILE';
export function editProfile() {
  return { type: EDIT_PROFILE };
}
export const VIEW_PROFILE = 'VIEW_PROFILE';
export function viewProfile() {
  return { type: VIEW_PROFILE };
}
