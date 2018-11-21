import { combineReducers } from 'redux';
import {
  LOGOUT,
  LOGIN_SUCCESS,
  GUIDE_LOGIN_SUCCESS,
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
  customerId: '',
  userName: '',
  token: '',
  role: '',
  personalId: '',
  email: '',
  profile: {
    fullName: '',
    gender: '',
    firstName: '',
    lastName: '',
    birthDate: '',
    phoneNumber: ''
  },
  guideInfo: null,
  // guideInfo: {
  //   guideId: "",
  //   userName: "",
  //   password: "",
  //   personalId: "",
  //   email: "",
  //   firstName: "",
  //   lastName: "",
  //   birthDate: "",
  //   gender: "",
  //   phoneNumber: "",
  //   bankAccountNumber: "",
  //   bankName: "",
  //   approvalStatus: "",
  //   availableDate: "",
  //   dealtTrips: "",
  //   publishedTours: ""

  //   //   guideId: "guidid",
  //   //   userName: "guideUser",
  //   //   password: "password",
  //   //   personalId: "1234567890123",
  //   //   email: "guide@gmail.com",
  //   //   firstName: "",
  //   //   lastName: "",
  //   //   birthDate: "",
  //   //   gender: "",
  //   //   phoneNumber: "",
  //   //   bankAccountNumber: "102943940",
  //   //   bankName: "SCB",
  //   //   approvalStatus: "1",
  //   //   availableDate: "",
  //   //   dealtTrips: "",
  //   //   publishedTours: [
  //   //     {
  //   //       tourId: "tourid",
  //   //       tourName: "Live the Agricultural Life in the Mountains of Chiang Mai",
  //   //       detail:
  //   //         "I'll be taking you to experience Mae Tang to see the agricultural canal lifestyle where water is life! People in Mae Tang are mostly farmers and live their simple lives along the canal. Enjoy cycling along the canals and enjoy the nature!",
  //   //       guideId: "guideid",
  //   //       minimumSize: 1,
  //   //       maximumSize: 5,
  //   //       price: 5000,
  //   //       reviews: [],
  //   //       trips: []
  //   //     },
  //   //     {
  //   //       tourId: "tourid2",
  //   //       tourName:
  //   //         'Explore the Bua Tong "Sticky" Waterfall with a Super Local Expert',
  //   //       detail:
  //   //         "Bua Tong Waterfall is most unusual because it is limestone waterfall and is not slippery. As a super Local Expert, I know the safest spots to climb and will go into the water with you and show where to step onto and grip!",
  //   //       guideId: "guideid",
  //   //       minimumSize: 1,
  //   //       maximumSize: 5,
  //   //       price: 5000,
  //   //       reviews: [],
  //   //       trips: []
  //   //     },
  //   //     {
  //   //       tourId: "tourid3",
  //   //       tourName:
  //   //         "Befriend the Elephants and Learn How to Make Coffee the Karen Way!",
  //   //       detail:
  //   //         "Come and learn everything about elephants and our mission to take care and protect them! Meet, feed and care for the elephants and learn how to make coffee from the Karen hill tribe with organic coffee in the local village!",
  //   //       guideId: "guideid",
  //   //       minimumSize: 1,
  //   //       maximumSize: 5,
  //   //       price: 5000,
  //   //       reviews: [],
  //   //       trips: []
  //   //     },
  //   //     {
  //   //       tourId: "tourid4",
  //   //       tourName:
  //   //         "Damnoen Saduak Floating Market from Bangkok: Railway Market, Temple in a Tree & Local Seafood",
  //   //       detail:
  //   //         'Explore the most popular markets, Damnoen Saduak Floating Market and Maeklong Railway Market (Rom Hub). Visit one of the most unique temples. Have a special lunch at a local restaurant, with "real" local seafood dishes as the highlight.',
  //   //       guideId: "guideid",
  //   //       minimumSize: 1,
  //   //       maximumSize: 5,
  //   //       price: 5000,
  //   //       reviews: [],
  //   //       trips: []
  //   //     },
  //   //     {
  //   //       tourId: "tourid5",
  //   //       tourName:
  //   //         "Exploring Koh Kret Island and Making Handmade Pottery by Electric Scooter!",
  //   //       detail:
  //   //         "Escape from the busy city and go out to the nearby town Nonthaburi. When you across the river to Koh Kret to learn how to make a pottery and enjoy the street sells traditional Thai food and ancient Thai desserts.",
  //   //       guideId: "guideid",
  //   //       minimumSize: 1,
  //   //       maximumSize: 5,
  //   //       price: 5000,
  //   //       reviews: [],
  //   //       trips: []
  //   //     },
  //   //     {
  //   //       tourId: "fca2c96e-deeb-4505-8e42-2370070b4dd8",
  //   //       tourName: "boneTour",
  //   //       minimumSize: 3,
  //   //       maximumSize: 5,
  //   //       price: 100,
  //   //       detail: "end me please",
  //   //       trips: [],
  //   //       reviews: [],
  //   //       guideId: "guideid"
  //   //     },
  //   //     {
  //   //       tourId: "b3a7a1f9-4271-45d2-adb4-799e58a94962",
  //   //       tourName: "boneTour2",
  //   //       minimumSize: 3,
  //   //       maximumSize: 5,
  //   //       price: 100,
  //   //       detail: "end me please please",
  //   //       trips: [],
  //   //       reviews: [],
  //   //       guideId: "guideid"
  //   //     },
  //   //     {
  //   //       tourId: "9eb29c11-21fc-42be-845f-37ae14d1deab",
  //   //       tourName: "boneTour3",
  //   //       minimumSize: 3,
  //   //       maximumSize: 5,
  //   //       price: 100,
  //   //       detail: "i want to die",
  //   //       trips: [],
  //   //       reviews: [],
  //   //       guideId: "guideid"
  //   //     }
  //   //   ]
  // },
  isView: false
};

function customerId(state = initialState.customerId, action) {
  switch (action.type) {
    case GET_USER_INFO:
      return action.payload.customerId;
    case LOGOUT:
      return '';
    default:
      return state;
  }
}

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
    case GUIDE_LOGIN_SUCCESS:
      return action.payload.token;
    default:
      return state;
  }
}

function userName(state = initialState.userName, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      console.log('SUCCESS AT USERNAME');
      return action.payload.userName;
    case GUIDE_LOGIN_SUCCESS:
      return action.payload.userName;
    case LOGOUT:
      return '';
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
      const fullName = firstName + ' ' + lastName;
      return {
        ...action.payload.profile,
        socialID,
        name: fullName,
        email
      };
    case EDIT_USER_INFO:
      const input = action.payload.profile;
      state.phoneNumber = input.phoneNumber;
      state.email = input.email;
      return state;
    case LOGOUT:
      return {};
    default:
      return state;
  }
}

function email(state = initialState.email, action) {
  switch (action.type) {
    case GET_USER_INFO:
      return action.payload.email;
    case LOGOUT:
      return '';
    default:
      return state;
  }
}

function personalId(state = initialState.personalId, action) {
  switch (action.type) {
    case GET_USER_INFO:
      return action.payload.personalId;
    case LOGOUT:
      return '';
    default:
      return state;
  }
}
function guideInfo(state = initialState.guideInfo, action) {
  switch (action.type) {
    case GET_GUIDE_INFO:
      return {
        ...action.payload.guideInfo,
        name:
          action.payload.guideInfo.firstName +
          ' ' +
          action.payload.guideInfo.lastName
      };
    case GUIDE_LOGIN_SUCCESS:
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
      console.log('SUCCESS AT ROLE');
      return action.payload.role;
    case GUIDE_LOGIN_SUCCESS:
      return action.payload.role;
    case LOGOUT:
      return '';
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
  customerId
});

export default reducer;
