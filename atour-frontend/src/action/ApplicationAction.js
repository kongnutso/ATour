export const LOGIN = "LOGIN";
export function login(username, password, role) {
  return {
    type: LOGIN,
    payload: { username, password, role, userInfo: "" }
  };
}

export const LOGOUT = "LOGOUT";
export function logout() {
  return {
    type: LOGOUT
  };
}

export const EDIT_USER_INFO = "EDIT_USER_INFO";
export function editUserInfo(userInfo) {
  return {
    type: EDIT_USER_INFO,
    payload: userInfo
  };
}
