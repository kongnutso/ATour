import { combineReducers } from 'redux';
import { SELECT_GUIDE } from '../action/SelectAction';
import { ON_SEARCH_GUIDE } from '../action/SearchAction';
const initialState = {
  guideList: [],
  selectedGuide: {}
};

function guideList(state = initialState.guideList, action) {
  switch (action.type) {
    case ON_SEARCH_GUIDE:
      return action.payload;
    default:
      return state;
  }
}

function selectedGuide(state = initialState.selectedGuide, action) {
  switch (action.type) {
    case SELECT_GUIDE:
      return action.payload;
    default:
      return state;
  }
}

const reducer = combineReducers({ guideList, selectedGuide });
export default reducer;
