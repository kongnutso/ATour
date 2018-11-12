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
