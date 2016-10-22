/**
 * Created by jevgenir on 10/21/2016.
 */
import {SET_CAR} from "./../constants/Car.constant";

export function setCarData(value) {
  return {
    type: SET_CAR,
    payload: value
  };
}

export const actions = {
  setCarData
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SET_CAR]: (state, action) => action.payload
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {isFetching: false, car: null};
export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
