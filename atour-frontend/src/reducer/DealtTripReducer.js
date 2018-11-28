import { combineReducers } from "redux";
import { ADD_DEALT_TRIPS } from "../action/DealtTripAction";
const initialState = {
  dealtTripList: []
};

function dealtTripList(state = initialState.dealtTripList, action) {
  switch (action.type) {
    case ADD_DEALT_TRIPS:
      return [...state.dealtTripList, action.payload.dealtTrips];
    default:
      return state;
  }
}

const reducer = combineReducers({ dealtTripList });
export default reducer;
