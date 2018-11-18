import { combineReducers } from 'redux';
import {
  LOGOUT,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  CLEAR_ERROR
} from '../action/ApplicationAction';
import {
  EDIT_USER_INFO,
  VIEW_PROFILE,
  EDIT_PROFILE,
  GET_USER_INFO,
  GET_GUIDE_INFO
} from '../action/UserInfoAction';

const initialState = {
  isLoginSuccess: null,
  userName: '',
  token: '',
  role: 'Guide',
  userInfo: {
    gender: '',
    firstName: '',
    lastName: '',
    socialID: '1100600370761',
    birthDate: '',
    phoneNumber: '',
    email: 'kongnut.s@hotmail.com'
  },
  guideInfo: {
    gender: 'Male',
    firstName: 'AAA',
    lastName: 'BBB',
    socialID: '1172620370761',
    birthDate: '1997/13/05',
    phoneNumber: '0817276720',
    email: 'aaaa.so@gmail.com',
    userName: ''
  },
  isView: false
};

function isLoginSuccess(state = initialState.isLoginSuccess, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return true;
    case LOGIN_FAILED:
      return false;
    case CLEAR_ERROR:
      return null;
    case LOGOUT:
      return null;
    default:
      return state;
  }
}

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

function token(state = initialState.token, action) {
  switch (action.type) {
    case LOGOUT:
      return '';
    case LOGIN_SUCCESS:
      return action.payload.token;
    default:
      return state;
  }
}

function userName(state = initialState.userName, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return action.payload.userName;
    case LOGOUT:
      return '';
    default:
      return state;
  }
}

function userInfo(state = initialState.userInfo, action) {
  switch (action.type) {
    case GET_USER_INFO:
      const { socialID, email } = state;
      const { firstName, lastName } = action.payload;
      const fullName = firstName + ' ' + lastName;
      return { ...action.payload, socialID, name: fullName, email };
    case EDIT_USER_INFO:
      const input = action.payload;
      state.phoneNumber = input.phoneNumber;
      state.email = input.email;
      return state;
    case LOGOUT:
      return {};
    default:
      return state;
  }
}
function guideInfo(state = initialState.guideInfo, action) {
  switch (action.type) {
    case GET_GUIDE_INFO:
      const { phoneNumber, gender, birthDate } = state;
      const fullName = 'ABCDE FGHT';
      return {
        ...action.payload,
        socialID: action.payload.personalId,
        name: fullName,
        phoneNumber,
        gender,
        birthDate
      };
    case LOGOUT:
      return {};

    default:
      return state;
  }
}
function role(state = initialState.role, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return action.payload.role;
    case LOGOUT:
      return '';
    default:
      return state;
  }
}

const reducer = combineReducers({
  userName,
  userInfo,
  role,
  isView,
  guideInfo,
  token,
  isLoginSuccess
});

export default reducer;
