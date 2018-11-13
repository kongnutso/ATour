import { combineReducers } from 'redux';
import {
  REGISTER_MODAL,
  LOGIN_MODAL,
  WARNING_MODAL
} from '../action/ModalAction';

const initialState = {
  register: false,
  login: false,
  warning: false
};

function register(state = initialState.register, action) {
  switch (action.type) {
    case REGISTER_MODAL:
      return action.payload;
    default:
      return state;
  }
}

function login(state = initialState.login, action) {
  switch (action.type) {
    case LOGIN_MODAL:
      return action.payload;
    default:
      return state;
  }
}

function warning(state = initialState.warning, action) {
  switch (action.type) {
    case WARNING_MODAL:
      return action.payload;
    default:
      return state;
  }
}

const reducer = combineReducers({ register, login, warning });

export default reducer;
