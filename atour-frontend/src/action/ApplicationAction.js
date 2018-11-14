export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export function loginSuccess(token, role, username) {
  return {
    type: LOGIN_SUCCESS,
    payload: {
      role: role ? 'Customer' : 'Guide',
      token,
      username
    }
  };
}

export const LOGOUT = 'LOGOUT';
export function logout() {
  return {
    type: LOGOUT
  };
}

export const RESIZE_WINDOW = 'RESIZE_WIDNOW';
export function resizeWindow(width) {
  return {
    type: RESIZE_WINDOW,
    payload: width
  };
}

export function search(keywords) {
  return {};
}
