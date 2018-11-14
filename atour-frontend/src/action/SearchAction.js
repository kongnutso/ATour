export const ON_CHANGE = 'ON_CHANGE';
export const ON_SEARCH = 'ON_SEARCH';

export function onChange(value) {
  return {
    type: ON_CHANGE,
    payload: value,
  };
}

export function onSearch() {
  //do search
  console.log('search si wa sas');
  return {
    type: ON_SEARCH,
  };
}
