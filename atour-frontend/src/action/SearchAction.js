import axios from 'axios';
export const ON_CHANGE = 'ON_CHANGE';
export const ON_SEARCH = 'ON_SEARCH';

export function onChange(value) {
  return {
    type: ON_CHANGE,
    payload: value
  };
}

export function onSearch(keyword) {
  return async dispatch => {
    try {
      const res = await axios
        .get('http://localhost:3000/customer/searchTours', keyword)
        .then(res => {
          return res.data;
        });
      let result = [];
      if (keyword === 'Chiang Mai') {
        result.push(res[0]);
      } else if (keyword === 'Karen Way') {
        result.push(res[2]);
      } else if (keyword === 'Bangkok') {
        result.push(res[3]);
      } else if (keyword === 'Koh Kret') {
        result.push(res[4]);
      } else if (!keyword) {
        result = res;
      }
      return dispatch({
        type: ON_SEARCH,
        payload: result
      });
    } catch (e) {}
  };
}
