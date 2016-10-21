/**
 * Created by jevgenir on 10/21/2016.
 */
import {SET_CARS} from "./../constants/Cars.constant";

export function setCars(value) {
  return {
    type: SET_CARS,
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
  [SET_CARS]: (state, action) => action.payload
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {isFetching: false, cars: []};
export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
