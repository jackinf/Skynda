import {
  LOAD_CREATE_SUCCESS,
  LOAD_EDIT_REQUEST,
  LOAD_EDIT_SUCCESS,
  LOAD_EDIT_FAILURE,
} from "../actions/VehicleModel.load.actions";

import {
  ADD_REQUEST,
  ADD_SUCCESS,
  ADD_FAILURE,
  EDIT_REQUEST,
  EDIT_SUCCESS,
  EDIT_FAILURE
} from "../actions/VehicleModel.submit.actions";
import {
  SET_RANDOM_ITEM
} from "../actions/VehicleModel.randomize.actions";
import {FORM_MODE} from "../../../constants/VehicleModel.constant";

const ACTION_HANDLERS = {
  [LOAD_CREATE_SUCCESS]: (state, action) => ({...state, type: action.type, isFetching: action.isFetching, formMode: action.formMode, errors: action.errors}),
  [LOAD_EDIT_REQUEST]: (state, action) => ({...state, type: action.type, isFetching: action.isFetching, formMode: action.formMode, errors: action.errors}),
  [LOAD_EDIT_SUCCESS]: (state, action) => ({...state, type: action.type, isFetching: action.isFetching, formMode: action.formMode, errors: action.errors}),
  [LOAD_EDIT_FAILURE]: (state, action) => ({...state, type: action.type, isFetching: action.isFetching, formMode: action.formMode, errors: action.errors}),

  [ADD_REQUEST]: (state, action) => ({...state, type: action.type, isFetching: action.isFetching, errors: action.errors}),
  [ADD_SUCCESS]: (state, action) => ({...state, type: action.type, isFetching: action.isFetching, formMode: action.formMode, errors: action.errors}),
  [ADD_FAILURE]: (state, action) => ({...state, type: action.type, isFetching: action.isFetching, errors: action.errors}),
  [EDIT_REQUEST]: (state, action) => ({...state, type: action.type, isFetching: action.isFetching, formMode: action.formMode, errors: action.errors}),
  [EDIT_SUCCESS]: (state, action) => ({...state, type: action.type, isFetching: action.isFetching, formMode: action.formMode, errors: action.errors}),
  [EDIT_FAILURE]: (state, action) => ({...state, type: action.type, isFetching: action.isFetching, formMode: action.formMode, errors: action.errors}),

  [SET_RANDOM_ITEM]: (state, action) => ({...state, type: action.type, item: action.item, errors: action.errors})
};

const initialState = {isFetching: false, errors: {}, formMode: FORM_MODE.NONE_MODEL};
// ------------------------------------
// Reducer
// ------------------------------------
export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
