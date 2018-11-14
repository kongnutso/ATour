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

export const RESIZE_WINDOW = 'RESIZE_WIDNOW';
export function resizeWindow(width) {
  return {
    type: RESIZE_WINDOW,
    payload: width
  };
}
