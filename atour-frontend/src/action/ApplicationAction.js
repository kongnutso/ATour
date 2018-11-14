export const LOGIN = 'LOGIN';
export function login(username, password, role) {
  return {
    type: LOGIN,
    payload: { username, password, role, userInfo: '' }
  };
}

export const LOGOUT = 'LOGOUT';
export function logout() {
  return {
    type: LOGOUT
  };
}

export const EDIT_USER_INFO = 'EDIT_USER_INFO';
export function editUserInfo(userInfo) {
  return {
    type: EDIT_USER_INFO,
    payload: userInfo
  };
}

export const SET_WARNING_TYPE = 'SET_WARNING_TYPE';
export function setWarningType(type) {
  return {
    type: SET_WARNING_TYPE,
    payload: type
  };
}

export const RESIZE_WINDOW = 'RESIZE_WIDNOW';
export function resizeWindow(width) {
  return {
    type: RESIZE_WINDOW,
    payload: width
  };
}

export const SET_IMAGE = 'SET_IMAGE';
export function setImage(url) {
  return {
    type: SET_IMAGE,
    payload: url
  };
}
