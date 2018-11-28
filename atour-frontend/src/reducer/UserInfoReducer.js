import { combineReducers } from "redux";
import {
  LOGOUT,
  LOGIN_SUCCESS,
  GUIDE_LOGIN_SUCCESS,
  ADMIN_LOGIN_SUCCESS,
  LOGIN_FAILED,
  CLEAR_ERROR
} from "../action/ApplicationAction";
import {
  EDIT_USER_INFO,
  VIEW_PROFILE,
  EDIT_PROFILE,
  GET_USER_INFO,
  GET_GUIDE_INFO,
  EDIT_GUIDE_USER_INFO,
  UPDATED
} from "../action/UserInfoAction";
import { SELECT_GUIDE } from "../action/SelectAction";

const initialState = {
  isLoginSuccess: null,
  customerId: "",
  userName: "",
  token: "",
  role: "",
  personalId: "",
  email: "",
  profile: {
    fullName: "",
    gender: "",
    firstName: "",
    lastName: "",
    birthDate: "",
    phoneNumber: ""
  },
  isUpdated: false,
  guideInfo: null,
  isView: false
};

function customerId(state = initialState.customerId, action) {
  switch (action.type) {
    case GET_USER_INFO:
      return action.payload.customerId;
    case LOGOUT:
      return "";
    default:
      return state;
  }
}

function isLoginSuccess(state = initialState.isLoginSuccess, action) {
  switch (action.type) {
    case ADMIN_LOGIN_SUCCESS:
    case GUIDE_LOGIN_SUCCESS:
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

function isUpdated(state = initialState.isUpdated, action) {
  switch (action.type) {
    case EDIT_GUIDE_USER_INFO:
    case EDIT_USER_INFO:
      return true;
    case UPDATED:
      return false;
    default:
      return state;
  }
}

function isView(state = initialState.isView, action) {
  switch (action.type) {
    case VIEW_PROFILE:
    case SELECT_GUIDE:
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
      return "";
    case LOGIN_SUCCESS:
      return action.payload.token;
    case GUIDE_LOGIN_SUCCESS:
      return action.payload.token;
    default:
      return state;
  }
}

function userName(state = initialState.userName, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return action.payload.userName;
    case GUIDE_LOGIN_SUCCESS:
      return action.payload.userName;
    case ADMIN_LOGIN_SUCCESS:
      return action.payload.userName;
    case LOGOUT:
      return "";
    default:
      return state;
  }
}

function profile(state = initialState.profile, action) {
  switch (action.type) {
    case GET_USER_INFO:
      const { personalId, email } = action.payload;
      const socialID = personalId;
      const { firstName, lastName } = action.payload.profile;
      const fullName = firstName + " " + lastName;
      return {
        ...action.payload.profile,
        socialID,
        name: fullName,
        email
      };
    case EDIT_USER_INFO:
      const news = {
        ...state,
        phoneNumber: action.payload.phoneNumber,
        profileImageUrl: action.payload.profileImageUrl
      };
      return news;
    case LOGOUT:
      return {};
    default:
      return state;
  }
}

function email(state = initialState.email, action) {
  switch (action.type) {
    case EDIT_USER_INFO:
    case GET_USER_INFO:
      return action.payload.email;
    case LOGOUT:
      return "";
    default:
      return state;
  }
}

function personalId(state = initialState.personalId, action) {
  switch (action.type) {
    case GET_USER_INFO:
      return action.payload.personalId;
    case LOGOUT:
      return "";
    default:
      return state;
  }
}
function guideInfo(state = initialState.guideInfo, action) {
  switch (action.type) {
    case GUIDE_LOGIN_SUCCESS:
    case EDIT_GUIDE_USER_INFO:
    case GET_GUIDE_INFO:
    case SELECT_GUIDE:
      return action.payload.guideInfo;
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
    case GUIDE_LOGIN_SUCCESS:
      return action.payload.role;
    case ADMIN_LOGIN_SUCCESS:
      return action.payload.role;
    case LOGOUT:
      return "";
    default:
      return state;
  }
}

const reducer = combineReducers({
  userName,
  role,
  isView,
  profile,
  token,
  isLoginSuccess,
  guideInfo,
  email,
  personalId,
  customerId,
  isUpdated
});

export default reducer;
