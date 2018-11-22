import { combineReducers } from 'redux';
import {
  BOOK_TRIP,
  SET_IMAGE_SLIP,
  SEE_BOOK_HISTORY
} from '../action/BookAction';

const initialState = {
  bookedList: [
    // {
    //   tourName: 'boat travel',
    //   tourId: '1234',
    //   tourDate: '1/1/2018',
    //   guide: 'ching',
    //   status: 'IN PROCESS',
    //   tourStatus: 1,
    //   bookedDate: '1/1/2018',
    //   uploadedFileDate: '',
    //   bookedId: '1234',
    //   slip: 'a.jpg',
    //   size: '3'
    // },
    // {
    //   tourName: 'tuktuk travel',
    //   tourId: '5678',
    //   tourDate: '1/1/2018',
    //   guide: 'ching',
    //   status: 'IN PROCESS',
    //   tourStatus: 1,
    //   bookedDate: '1/2/2018',
    //   uploadedFileDate: '',
    //   bookedId: '1000',
    //   slip: 'a.jpg',
    //   size: '4'
    // }
  ]
};

function bookedList(state = initialState.bookedList, action) {
  switch (action.type) {
    case SEE_BOOK_HISTORY: {
      return action.payload;
    }
    default:
      return state;
  }
}

const reducer = combineReducers({ bookedList });
export default reducer;
