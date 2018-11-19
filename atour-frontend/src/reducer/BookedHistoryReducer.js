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

const defaults = {
  status: 'IN PROCESS',
  tourStatus: 2,
  uploadedFileDate: '',
  slip: ''
};

function bookedList(state = initialState.bookedList, action) {
  switch (action.type) {
    case SEE_BOOK_HISTORY: {
      bookedList = action.payload;
      return state;
    }
    case BOOK_TRIP:
      const {
        tourName,
        tourId,
        size,
        guideName,
        tripId,
        guideId
      } = action.payload;

      const { bookDate } = action.res.bookInfo;
      const { tripDate } = action.res;

      const news = {
        tourName: tourName,
        tourDate: tripDate,
        size,
        guide: guideId,
        bookedDate: bookDate,
        tourId,
        tripId,
        ...defaults
      };
      return [...state, news];
    case SET_IMAGE_SLIP:
      const res = state.map(e => {
        if (e.bookedId === action.payload.bookedId) {
          e.tourStatus = 3;
          e.slip = action.payload.url;
          e.bookedDate = action.payload.today;
        }
        return e;
      });
      return res;
    default:
      return state;
  }
}

const reducer = combineReducers({ bookedList });
export default reducer;
