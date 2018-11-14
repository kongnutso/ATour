import { combineReducers } from 'redux';
import { BOOK_TRIP } from '../action/BookAction';

const initialState = {
  bookedList: [
    {
      tourName: 'boat travel',
      tourId: '1234',
      tourDate: '1/1/2018',
      guide: 'ching',
      status: 'IN PROCESS',
      tourStatus: 1,
      bookedDate: '1/1/2018',
      uploadedFileDate: '',
      bookedId: '1234',
      slip: 'a.jpg',
      size: '3'
    },
    {
      tourName: 'tuktuk travel',
      tourId: '5678',
      tourDate: '1/1/2018',
      guide: 'ching',
      status: 'IN PROCESS',
      tourStatus: 1,
      bookedDate: '1/2/2018',
      uploadedFileDate: '',
      bookedId: '1000',
      slip: 'a.jpg',
      size: '4'
    }
  ]
};

const defaults = {
  status: 'IN PROCESS',
  tourStatus: 1,
  uploadedFileDate: '',
  bookedId: '1',
  slip: ''
};

function bookedList(state = initialState.bookedList, action) {
  switch (action.type) {
    case BOOK_TRIP:
      const {
        tourInfo: { tourName, guideName, tourId },
        date,
        size,
        today
      } = action.payload;

      const news = {
        tourName: tourName,
        tourDate: date,
        size,
        guide: guideName,
        bookedDate: today,
        tourId,
        ...defaults
      };
      return [...state, news];
    default:
      return state;
  }
}

const reducer = combineReducers({ bookedList });
export default reducer;
