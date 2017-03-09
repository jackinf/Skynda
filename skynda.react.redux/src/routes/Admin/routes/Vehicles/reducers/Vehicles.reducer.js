/**
 * Created by jevgenir on 10/21/2016.
 */

import {
  GET_LIST_REQUEST,
  GET_LIST_SUCCESS,
  GET_LIST_FAILURE
} from "../actions/Vehicles.get-list.actions";
import {
  DELETE_REQUEST,
  DELETE_SUCCESS,
  DELETE_FAILURE
} from "../actions/Vehicles.delete-item.actions";

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

// import {ACTIONS} from "../constants/Vehicles.constant";
//
// export function setVehicles(value) {
//   return {
//     type: ACTIONS.SET_VEHICLES_DATA,
//     payload: value
//   };
// }
//
// export const actions = {
//   setVehicles
// };

// // ------------------------------------
// // Action Handlers
// // ------------------------------------
// const ACTION_HANDLERS = {
//   [ACTIONS.SET_VEHICLES_DATA]: (state, action) => action.payload
// };

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {isFetching: false, items: [], formMode: NONE};
export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
