import {
  LOAD_CREATE_SUCCESS,
  LOAD_EDIT_REQUEST,
  LOAD_EDIT_SUCCESS,
  LOAD_EDIT_FAILURE
} from "../actions/Vehicle.load.action"

import {
  ADD_REQUEST,
  ADD_SUCCESS,
  ADD_FAILURE,
  EDIT_REQUEST,
  EDIT_SUCCESS,
  EDIT_FAILURE
} from "../actions/Vehicle.submit.action"

import {
  CLEAR_VEHICLE_DATA
} from "../actions/Vehicle.clear.action";

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [CLEAR_VEHICLE_DATA]: (state, action) => ({...state, isFetching: action.isFetching, item: action.item}),

  [LOAD_CREATE_SUCCESS]: (state, action) => ({...state, type: action.type, isFetching: action.isFetching, errors: action.errors, formMode: action.formMode}),
  [LOAD_EDIT_FAILURE]: (state, action) => ({...state, type: action.type, isFetching: action.isFetching, errors: action.errors, formMode: action.formMode}),
  [LOAD_EDIT_SUCCESS]: (state, action) => ({...state, type: action.type, isFetching: action.isFetching, formMode: action.formMode, item: action.item}),
  [LOAD_EDIT_REQUEST]: (state, action) => ({...state, type: action.type, isFetching: action.isFetching, formMode: action.formMode}),

  [ADD_REQUEST]: (state, action) => ({...state, type: action.type, isFetching: action.isFetching, formMode: action.formMode}),
  [ADD_SUCCESS]: (state, action) => ({...state, type: action.type, isFetching: action.isFetching, formMode: action.formMode}),
  [ADD_FAILURE]: (state, action) => ({...state, type: action.type, isFetching: action.isFetching, formMode: action.formMode, errors: action.errors}),

  [EDIT_REQUEST]: (state, action) => ({...state, type: action.type, isFetching: action.isFetching, formMode: action.formMode}),
  [EDIT_SUCCESS]: (state, action) => ({...state, type: action.type, isFetching: action.isFetching, formMode: action.formMode, item: action.item}),
  [EDIT_FAILURE]: (state, action) => ({...state, type: action.type, isFetching: action.isFetching, formMode: action.formMode, errors: action.errors}),

};

const initialState = {isFetching: false, item: {}, errors: []};
// ------------------------------------
// Reducer
// ------------------------------------
export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
