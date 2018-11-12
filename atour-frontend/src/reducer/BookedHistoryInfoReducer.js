import { combineReducers } from 'redux';

const initialState = {
  tourStatus: 3,
  bookedDate: '1/1/2018',
  uploadedFileDate: '31/12/2018',
  bookedId: '1234',
  image: 'a.jpg'
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

const reducer = combineReducers({
  tourStatus,
  bookedDate,
  uploadedFileDate,
  bookedId,
  image
});

export default reducer;
