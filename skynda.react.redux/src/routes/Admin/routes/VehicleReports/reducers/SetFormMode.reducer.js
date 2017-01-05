/**
 * Created by jevgenir on 10/22/2016.
 */
import {ACTIONS, FORM_MODE} from "../constants/VehicleReport.constant";

export const setFormMode = (value) => ({
  type: ACTIONS.SET_FORM_MODE,
  payload: value
});

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [ACTIONS.SET_FORM_MODE]: (state, action) => action.payload
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = FORM_MODE.READING;
export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
