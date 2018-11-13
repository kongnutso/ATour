import { combineReducers } from 'redux';
import { SET_WARNING_TYPE } from '../action/ApplicationAction';

const initialState = {
  tourStatus: 3,
  bookedDate: '1/1/2018',
  uploadedFileDate: '31/12/2018',
  bookedId: '1234',
  image: 'a.jpg',
  modalType: ''
};

function tourStatus(state = initialState.tourStatus, action) {
  switch (state.action) {
    default:
      return state;
  }
}

function bookedDate(state = initialState.bookedDate, action) {
  switch (state.action) {
    default:
      return state;
  }
}

function uploadedFileDate(state = initialState.uploadedFileDate, action) {
  switch (state.action) {
    default:
      return state;
  }
}

function bookedId(state = initialState.bookedId, action) {
  switch (state.action) {
    default:
      return state;
  }
}

function image(state = initialState.image, action) {
  switch (state.action) {
    default:
      return state;
  }
}

function modalType(state = initialState.modalType, action) {
  switch (action.type) {
    case SET_WARNING_TYPE:
      state = action.payload;
      return state;
    default:
      return state;
  }
}

const reducer = combineReducers({
  tourStatus,
  bookedDate,
  uploadedFileDate,
  bookedId,
  image,
  modalType
});

export default reducer;
