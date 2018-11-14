import axios from 'axios';

export const LOGIN = 'LOGIN';
export function login(username, password, role) {
  return async dispatch => {
    function onSuccess(success) {
      console.log(success);
      dispatch({ type: LOGIN, payload: success });
      return success;
    }
    function onError(error) {
      dispatch({ type: '', error });
      return error;
    }
    try {
      const payload = { userName: username, password };
      console.log(payload);
      const success = await axios
        .post('http://localhost:3000/customer/login', payload)
        .then(res => {
          return res.data;
        });
      console.log(success);
      return onSuccess(success);
    } catch (error) {
      console.log(error);
    }
  };
  // if (role === 'customer') {
  //   const res =
  //   console.log(res);
  //   return {
  //     type: 'LOGIN1',
  //     payload: { username, password, role, userInfo: '' }
  //   };
  // }
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
