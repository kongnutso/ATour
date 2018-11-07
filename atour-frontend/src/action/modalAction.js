export const REGISTER_MODAL = "REGISTER_MODAL";
export function registerModal(isOpen) {
  return {
    type: REGISTER_MODAL,
    payload: isOpen
  };
}

export const LOGIN_MODAL = "LOGIN_MODAL";
export function loginModal(isOpen) {
  return {
    type: LOGIN_MODAL,
    payload: isOpen
  };
}