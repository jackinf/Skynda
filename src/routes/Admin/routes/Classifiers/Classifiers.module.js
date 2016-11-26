/**
 * Created by jevgenir on 11/13/2016.
 */
import {ACTIONS} from "./Classifiers.constant";

export function getClassifiers(value) {
  return {
    type: ACTIONS.SET_DATA,
    payload: value
  };
}

export const actions = {
  getClassifiers
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [ACTIONS.SET_DATA]: (state, action) => action.payload
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {isFetching: false, items: []};
export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
