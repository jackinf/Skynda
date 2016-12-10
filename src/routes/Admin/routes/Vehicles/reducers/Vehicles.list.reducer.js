/**
 * Created by jevgenir on 10/21/2016.
 */
import {ACTIONS} from "../constants/Vehicle.constant";

export function setVehicles(value) {
  return {
    type: ACTIONS.SET_VEHICLES_DATA,
    payload: value
  };
}

export const actions = {
  setVehicles
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [ACTIONS.SET_VEHICLES_DATA]: (state, action) => action.payload
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {isFetching: false, items: []};
export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
