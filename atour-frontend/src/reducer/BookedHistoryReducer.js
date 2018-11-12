import { combineReducers } from 'redux';

const initialState = {
  bookedList: [
    {
      tourName: 'boat travel',
      tourId: '1234',
      tourDate: '1/1/2018',
      guide: 'ching',
      status: 'IN PROCESS'
    },
    {
      tourName: 'tuktuk travel',
      tourId: '5678',
      tourDate: '1/1/2018',
      guide: 'ching',
      status: 'IN PROCESS'
    }
  ]
};

function bookedList(state = initialState.bookedList, action) {
  switch (action.type) {
    default:
      return state;
  }
}

const reducer = combineReducers({ bookedList });
export default reducer;
