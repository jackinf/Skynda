/**
 * Created by jevgenir on 10/21/2016.
 */

import {
  GET_LIST_REQUEST,
  GET_LIST_SUCCESS,
  GET_LIST_FAILURE
} from "../actions/VehicleReports.get-list.action";
import {
  DELETE_REQUEST,
  DELETE_SUCCESS,
  DELETE_FAILURE
} from "../actions/VehicleReports.delete-item.action";

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_LIST_REQUEST]: (state, action) => ({...state, type: action.type, isFetching: action.isFetching, errors: action.errors}),
  [GET_LIST_SUCCESS]: (state, action) => ({...state, type: action.type, isFetching: action.isFetching, errors: action.errors, items: action.items}),
  [GET_LIST_FAILURE]: (state, action) => ({...state, type: action.type, isFetching: action.isFetching, errors: action.errors, items: action.items}),

  [DELETE_REQUEST]: (state, action) => ({...state, type: action.type, isFetching: action.isFetching, errors: action.errors}),
  [DELETE_SUCCESS]: (state, action) => ({...state, type: action.type, isFetching: action.isFetching, errors: action.errors}),
  [DELETE_FAILURE]: (state, action) => ({...state, type: action.type, isFetching: action.isFetching, errors: action.errors}),
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {isFetching: false, items: []};
export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
