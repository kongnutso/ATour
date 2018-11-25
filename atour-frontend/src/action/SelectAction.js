export const SELECT_TOUR = "SELECT_TOUR";
export function selectTour(tour) {
  return { type: SELECT_TOUR, payload: tour };
}

export const SELECT_GUIDE = "SELECT_GUIDE";
export function selectGuide(guide) {
  return { type: SELECT_GUIDE, payload: guide };
}
