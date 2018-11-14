import axios from 'axios';

export const SELECT_TOUR = 'SELECT_TOUR';
export function selectTour(tour) {
  return { type: SELECT_TOUR, payload: tour };
}
