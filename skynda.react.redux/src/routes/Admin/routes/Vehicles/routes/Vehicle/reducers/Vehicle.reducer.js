import {browserHistory} from "react-router";
import {toastr} from 'react-redux-toastr';
import {FORM_MODE} from "../../../constants/Vehicles.constant";
import _ from "underscore";
// ------------------------------------
// Actions
// ------------------------------------

const FETCHING = "VEHICLE/FETCHING";
const FETCH_SUCCESSFUL = "VEHICLE/FETCH_SUCCESSFUL";
const FETCH_FAILED = "VEHICLE/FETCH_FAILED";


export const onHandleSubmitFinished = (resp, exFormMode, getVehicles) => (dispatch) => {
  if (resp) {
    if (!resp.modelState && !isNaN(parseInt(resp.id))) {

      if(exFormMode == FORM_MODE.ADDING && _.isFunction(getVehicles)){
        getVehicles();
      }
      dispatch(setFormMode(FORM_MODE.UPDATING));
      dispatch(setFetchSuccessful(resp.id));
      browserHistory.replace("/admin/vehicle/" + resp.id);
      toastr.success('Success', resp.message);
    } else {
      dispatch(setFetchFailed(resp.errors));
      browserHistory.replace("/admin/vehicle");
    }
  }
};

// ------------------------------------
// Action Creators
// ------------------------------------

function setFormMode(formMode = FORM_MODE.NONE) {
  return {
    type: ACTIONS.SET_FORM_MODE,
    formMode
  };
}

function setFetchSuccessful(id) {
  return {
    id: id,
    type: FETCH_SUCCESSFUL,
    isFetching: false,
    errors: []  // no errors
  }
}

function setFetchFailed(errors) {
  return {
    type: FETCH_FAILED,
    isFetching: false,
    errors
  }
}

import {
  GET_LIST_REQUEST as GET_LIST_REQUEST_FEATURE,
  GET_LIST_SUCCESS as GET_LIST_SUCCESS_FEATURE,
  GET_LIST_FAILURE as GET_LIST_FAILURE_FEATURE
} from "../actions/Vehicle.features.get-list.action";

import {
  GET_LIST_REQUEST as GET_LIST_REQUEST_REPORT,
  GET_LIST_SUCCESS as GET_LIST_SUCCESS_REPORT,
  GET_LIST_FAILURE as GET_LIST_FAILURE_REPORT
} from "../actions/Vehicle.reports.get-list.action";

import {
  GET_LIST_REQUEST as GET_LIST_REQUEST_REVIEW,
  GET_LIST_SUCCESS as GET_LIST_SUCCESS_REVIEW,
  GET_LIST_FAILURE as GET_LIST_FAILURE_REVIEW
} from "../actions/Vehicle.reviews.get-list.action";

import {
  DELETE_REQUEST as DELETE_REQUEST_FEATURE,
  DELETE_SUCCESS as DELETE_SUCCESS_FEATURE,
  DELETE_FAILURE as DELETE_FAILURE_FEATURE
} from "../actions/Vehicle.features.delete-item.action";

import {
  DELETE_REQUEST as DELETE_REQUEST_REPORT,
  DELETE_SUCCESS as DELETE_SUCCESS_REPORT,
  DELETE_FAILURE as DELETE_FAILURE_REPORT
} from "../actions/Vehicle.reports.delete-item.action";

import {
  CLEAR_VEHICLE_DATA
} from "../actions/Vehicle.clear.action";

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [CLEAR_VEHICLE_DATA]: (state, action) => ({...state, item: action.item}),
  // [FETCHING]: (state, action) => ({...state, isFetching: action.isFetching, errors: action.errors}),
  // [FETCH_SUCCESSFUL]: (state, action) => ({...state, isFetching: action.isFetching, errors: action.errors}),
  // [FETCH_FAILED]: (state, action) => ({...state, isFetching: action.isFetching, errors: action.errors}),

  // FEATURES ACTION HANDLERS FOR REDUCER
  [GET_LIST_REQUEST_FEATURE]: (state, action) => ({...state, type: action.type, isFetching: action.isFetching, errors: action.errors}),
  [GET_LIST_SUCCESS_FEATURE]: (state, action) => ({...state, type: action.type, isFetching: action.isFetching, errors: action.errors, items: action.items}),
  [GET_LIST_FAILURE_FEATURE]: (state, action) => ({...state, type: action.type, isFetching: action.isFetching, errors: action.errors, items: action.items}),

  [DELETE_REQUEST_FEATURE]: (state, action) => ({...state, type: action.type, isFetching: action.isFetching, errors: action.errors}),
  [DELETE_SUCCESS_FEATURE]: (state, action) => ({...state, type: action.type, isFetching: action.isFetching, errors: action.errors}),
  [DELETE_FAILURE_FEATURE]: (state, action) => ({...state, type: action.type, isFetching: action.isFetching, errors: action.errors}),

  // REPORTS ACTION HANDLERS FOR REDUCER
  [GET_LIST_REQUEST_REPORT]: (state, action) => ({...state, type: action.type, isFetching: action.isFetching, errors: action.errors}),
  [GET_LIST_SUCCESS_REPORT]: (state, action) => ({...state, type: action.type, isFetching: action.isFetching, errors: action.errors, items: action.items}),
  [GET_LIST_FAILURE_REPORT]: (state, action) => ({...state, type: action.type, isFetching: action.isFetching, errors: action.errors, items: action.items}),

  [DELETE_REQUEST_REPORT]: (state, action) => ({...state, type: action.type, isFetching: action.isFetching, errors: action.errors}),
  [DELETE_SUCCESS_REPORT]: (state, action) => ({...state, type: action.type, isFetching: action.isFetching, errors: action.errors}),
  [DELETE_FAILURE_REPORT]: (state, action) => ({...state, type: action.type, isFetching: action.isFetching, errors: action.errors}),

  // REVIEWS ACTION HANDLERS FOR REDUCER
  [GET_LIST_REQUEST_REVIEW]: (state, action) => ({...state, type: action.type, isFetching: action.isFetching, errors: action.errors}),
  [GET_LIST_SUCCESS_REVIEW]: (state, action) => ({...state, type: action.type, isFetching: action.isFetching, errors: action.errors, items: action.items}),
  [GET_LIST_FAILURE_REVIEW]: (state, action) => ({...state, type: action.type, isFetching: action.isFetching, errors: action.errors, items: action.items}),
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {isFetching: false, item: [], errors: []};
export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
