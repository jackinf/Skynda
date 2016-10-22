/**
 * Created by jevgenir on 10/22/2016.
 */
import {SET_FORM_MODE, FORM_MODE} from "./../constants/Car.constant";

export function setFormMode(value) {
  return {
    type: SET_FORM_MODE,
    payload: value
  };
}

export const actions = {
  setFormMode
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SET_FORM_MODE]: (state, action) => action.payload
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {formMode: FORM_MODE.READING};
export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
