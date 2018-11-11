import { combineReducers } from "redux";
import {
  REGISTER_MODAL,
  LOGIN_MODAL,
  PUBLISHNEWTOUR_MODAL,
  EDITTOUR_MODAL,
  EDITAVAILABLEDATE_MODAL
} from "../action/ModalAction";

const initialState = {
  register: false,
  login: false,
  publishNewTour: false,
  editTour: false,
  editAvailableDate: false
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

function publishNewTour(state = initialState.publishNewTour, action) {
  switch (action.type) {
    case PUBLISHNEWTOUR_MODAL:
      return action.payload;
    default:
      return state;
  }
}

function editTour(state = initialState.editTour, action) {
  switch (action.type) {
    case EDITTOUR_MODAL:
      return action.payload;
    default:
      return state;
  }
}

function editAvailableDate(state = initialState.editAvailableDate, action) {
  switch (action.type) {
    case EDITAVAILABLEDATE_MODAL:
      return action.payload;
    default:
      return state;
  }
}

const reducer = combineReducers({ register, login, publishNewTour, editTour });

export default reducer;
