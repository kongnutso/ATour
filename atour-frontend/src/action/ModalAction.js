export const OPEN_MODAL = "OPEN_MODAL";
export function registerModal(isOpen) {
  let payload = "";
  if (isOpen) {
    payload = "register";
  }
  return {
    type: OPEN_MODAL,
    payload
  };
}

export function loginModal(isOpen) {
  let payload = "";
  if (isOpen) {
    payload = "login";
  }
  return {
    type: OPEN_MODAL,
    payload
  };
}

export function closeAllModal() {
  return {
    type: OPEN_MODAL,
    payload: ""
  };
}

export function publishNewTour(isOpen) {
  let payload = "";
  if (isOpen) {
    payload = "publishNewTour";
  }
  return {
    type: OPEN_MODAL,
    payload
  };
}

export function editTour(isOpen) {
  let payload = "";
  if (isOpen) {
    payload = "editTour";
  }
  return {
    type: OPEN_MODAL,
    payload
  };
}
