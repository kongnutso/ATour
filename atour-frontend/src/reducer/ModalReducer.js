import { combineReducers } from "redux";
import { OPEN_MODAL } from "../action/ModalAction";

const initialState = {
  modalName: ""
};

function modalName(state = initialState.modalName, action) {
  switch (action.type) {
    case OPEN_MODAL:
      return action.payload;
    default:
      return state;
  }
}

const reducer = combineReducers({ modalName });

export default reducer;
