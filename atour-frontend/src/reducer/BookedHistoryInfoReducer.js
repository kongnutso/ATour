import { combineReducers } from 'redux';

const initialState = {
  tourStatus: 3,
  bookedDate: '1/1/2018',
  uploadedFileDate: '31/12/2018'
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

const reducer = combineReducers({ tourStatus, bookedDate, uploadedFileDate });

export default reducer;
