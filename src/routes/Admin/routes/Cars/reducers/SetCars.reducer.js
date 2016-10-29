/**
 * Created by jevgenir on 10/21/2016.
 */
import {ACTIONS} from "./../constants/Car.constant";

export function setCars(value) {
  return {
    type: ACTIONS.SET_CARS_DATA,
    payload: value
  };
}

export const actions = {
  setCars
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [ACTIONS.SET_CARS_DATA]: (state, action) => action.payload
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {isFetching: false, items: []};
export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
