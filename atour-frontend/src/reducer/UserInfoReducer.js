import { combineReducers } from 'redux';
import { LOGIN, LOGOUT } from '../action/ApplicationAction';
import {
  EDIT_USER_INFO,
  VIEW_PROFILE,
  EDIT_PROFILE
} from '../action/UserInfoAction';

const initialState = {
  username: '',
  role: 'Guide',
  userInfo: {
    gender: 'Male',
    name: 'Kongnut Songwattana',
    socialID: '1100600370761',
    birthDate: '03/13/2540',
    phone: '0817776720',
    email: 'kongnut.s@hotmail.com'
  },
  otherInfo: {
    gender: 'Male',
    name: 'AAA BBB',
    socialID: '1172620370761',
    birthDate: '03/10/2540',
    phone: '0817276720',
    email: 'kongnut.so@gmail.com'
  },
  isView: false
};

function isView(state = initialState.isView, action) {
  switch (action.type) {
    case VIEW_PROFILE:
      return true;
    case EDIT_PROFILE:
      return false;
    default:
      return state;
  }
}

function username(state = initialState.username, action) {
  switch (action.type) {
    case LOGIN:
      return action.payload.username;
    case LOGOUT:
      return '';
    default:
      return state;
  }
}

function userInfo(state = initialState.userInfo, action) {
  switch (action.type) {
    // case LOGIN:
    //   return action.payload.userInfo;
    case EDIT_USER_INFO:
      const input = action.payload;
      state.phone = input.phone;
      state.email = input.email;
      return state;
    case LOGOUT:
      return state;
    default:
      return state;
  }
}

function role(state = initialState.role, action) {
  switch (action.type) {
    case LOGIN:
      return action.payload.role;
    case LOGOUT:
      return '';
    default:
      return state;
  }
}

function otherInfo(state = initialState.otherInfo, action) {
  return state;
}

const reducer = combineReducers({
  username,
  userInfo,
  role,
  isView,
  otherInfo
});

export default reducer;
