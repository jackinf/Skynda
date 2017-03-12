/**
 * Created by zekar on 3/12/2017.
 */

import {
  LOAD_CREATE_SUCCESS,
  LOAD_EDIT_REQUEST,
  LOAD_EDIT_SUCCESS,
  LOAD_EDIT_FAILURE
} from "../actions/VehicleReview.load.action";

import {
  ADD_REQUEST,
  ADD_SUCCESS,
  ADD_FAILURE,
  EDIT_REQUEST,
  EDIT_SUCCESS,
  EDIT_FAILURE
} from "../actions/VehicleReview.submit.action"


// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [LOAD_CREATE_SUCCESS]: (state, action) => ({...state, type: action.type, isFetching: action.isFetching, errors: action.errors, formMode: action.formMode}),
  [LOAD_EDIT_FAILURE]: (state, action) => ({...state, type: action.type, isFetching: action.isFetching, errors: action.errors, formMode: action.formMode}),
  [LOAD_EDIT_SUCCESS]: (state, action) => ({...state, type: action.type, isFetching: action.isFetching, formMode: action.formMode, item: action.item}),
  [LOAD_EDIT_REQUEST]: (state, action) => ({...state, type: action.type, isFetching: action.isFetching, formMode: action.formMode}),

  [ADD_REQUEST]: (state, action) => ({...state, type: action.type, isFetching: action.isFetching, formMode: action.formMode}),
  [ADD_SUCCESS]: (state, action) => ({...state, type: action.type, isFetching: action.isFetching, formMode: action.formMode}),
  [ADD_FAILURE]: (state, action) => ({...state, type: action.type, isFetching: action.isFetching, formMode: action.formMode, errors: action.errors}),

  [EDIT_REQUEST]: (state, action) => ({...state, type: action.type, isFetching: action.isFetching, formMode: action.formMode}),
  [EDIT_SUCCESS]: (state, action) => ({...state, type: action.type, isFetching: action.isFetching, formMode: action.formMode}),
  [EDIT_FAILURE]: (state, action) => ({...state, type: action.type, isFetching: action.isFetching, formMode: action.formMode, errors: action.errors}),

};

const initialState = {isFetching: false, items: [], errors: []};
export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
