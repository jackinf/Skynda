/**
 * Created by jevgenir on 10/26/2016.
 */
import {ACTIONS} from "../constants/CarManufacturers.constant";

export function setCarManufacturers(value) {
  return {
    type: ACTIONS.SET_CAR_MANUFACTURERS_DATA,
    payload: value
  };
}

export const actions = {
  setCarManufacturers
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [ACTIONS.SET_CAR_MANUFACTURERS_DATA]: (state, action) => action.payload
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {isFetching: false, items: []};
export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
