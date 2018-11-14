import axios from 'axios';

export const EDIT_USER_INFO = 'EDIT_USER_INFO';
export function editUserInfo(userInfo, token) {
  return async dispatch => {
    try {
      const payload = {
        userName: userInfo.username,
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
          return res.data;
        });
      return dispatch({
        type: GET_USER_INFO,
        payload: userInfo
      });
    } catch (e) {}
  };
}

export const EDIT_PROFILE = 'EDIT_PROFILE';
export function editProfile() {
  return { type: EDIT_PROFILE };
}
export const VIEW_PROFILE = 'VIEW_PROFILE';
export function viewProfile() {
  return { type: VIEW_PROFILE };
}
