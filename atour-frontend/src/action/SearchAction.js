import axios from 'axios';
export const ON_CHANGE = 'ON_CHANGE';
export const ON_SEARCH_TOUR = 'ON_SEARCH_TOUR';
export const ON_SEARCH_GUIDE = 'ON_SEARCH_GUIDE';

export function onChange(value) {
  return {
    type: ON_CHANGE,
    payload: value
  };
}

export function onSearch(keyword, isTour) {
  return async dispatch => {
    try {
      if (isTour) {
        const res = await axios
          .post('http://localhost:3000/customer/searchTour', { keyword })
          .then(res => {
            return res.data;
          });
        console.log(res);
        return dispatch({
          type: ON_SEARCH_TOUR,
          payload: res
        });
      } else {
        const res = await axios
          .post('http://localhost:3000/customer/searchGuide', { keyword })
          .then(res => {
            return res.data;
          });
        return dispatch({
          type: ON_SEARCH_GUIDE,
          payload: res
        });
      }
    } catch (e) {}
  };
}
