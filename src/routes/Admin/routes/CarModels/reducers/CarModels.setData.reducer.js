/**
 * Created by jevgenir on 10/26/2016.
 */
import {ACTIONS} from "./../constants/CarModel.constant";

export function setCarModels(value) {
  return {
    type: ACTIONS.SET_CAR_MODELS_DATA,
    payload: value
  };
}

export const actions = {
  setCarModels
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [ACTIONS.SET_CAR_MODELS_DATA]: (state, action) => action.payload
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {isFetching: false, cars: []};
export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
