/**
 * Created by jevgenir on 10/21/2016.
 */
import {browserHistory} from "react-router";
import {change, destroy} from "redux-form";
import {toastr} from 'react-redux-toastr';

import remoteConfig from "store/remoteConfig";
import {ACTIONS, FORM_MODE, FORMS, ROUTE_PARAMS} from "../constants/Vehicle.constant";
import fromSpringToReduxFormError from "../../../../../utils/formUtils/fromSpringToReduxFormError";

// ------------------------------------
// Actions
// ------------------------------------

const CLEAR_VEHICLE_DATA = "VEHICLE/CLEAR_VEHICLE_DATA";
const FETCHING = "VEHICLE/FETCHING";
const FETCH_SUCCESSFUL = "VEHICLE/FETCH_SUCCESSFUL";
const FETCH_FAILED = "VEHICLE/FETCH_FAILED";

// ------------------------------------
// Async Action Creators (Redux thunk)
// ------------------------------------

/**
 * Loads "Create new vehicle" or "Update existing vehicle" forms
 * @param id
 */
export const load = (id) => (dispatch) => {
  dispatch(destroy(FORMS.VEHICLE_FORM));
  const formMode = id === ROUTE_PARAMS.values.NEW
    ? FORM_MODE.ADDING : !isNaN(parseInt(id))
    ? FORM_MODE.UPDATING : FORM_MODE.NONE;

  if (formMode === FORM_MODE.ADDING) {
    dispatch(clearVehicleData());
    dispatch(setFormMode(FORM_MODE.ADDING));
  } else if (formMode == FORM_MODE.UPDATING && !isNaN(parseInt(id))) {
    dispatch(fetchItem(parseInt(id)));
  } else {
    console.error("Invalid form mode");
  }
};

/**
 * Private. Fetches data from API and prepares update form.
 * @param id - vehicle ID.
 */
const fetchItem = (id) => (dispatch) => {
  dispatch(setFetching(true));

  return fetch(`${remoteConfig.remote}/api/vehicle/${id}`, {
    method: "GET",
    credentials: "include",
    headers: {"Accept": "application/json", "Content-Type": "application/x-www-form-urlencoded"}
  })
    .then(resp => resp.json())
    .then(data => {
      dispatch(setFetchSuccessful());
      dispatch(setVehicleData(data));
      dispatch(setFormMode(FORM_MODE.UPDATING));
    })
    .catch((error) => {
      dispatch(setFetchFailed(error));
      dispatch(clearVehicleData());
    });
};

export const clear = () => (dispatch) => {
  dispatch(clearVehicleData());
  dispatch(setFetching(false));
};

export const onHandleSubmitFinished = (resp) => (dispatch) => {
  console.log("onHandleSubmitFinished", resp);
  if (resp) {
    if (resp.success && !isNaN(parseInt(resp.id))) {
      dispatch(change(FORMS.VEHICLE_FORM, "id", resp.id));
      dispatch(setFormMode(FORM_MODE.UPDATING));
      browserHistory.replace("/admin/vehicle/" + resp.id);
      toastr.success('Success', resp.message);
    } else {
      const errors = fromSpringToReduxFormError(resp.errors);
      dispatch(setFetchFailed(resp.errors));
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

function setVehicleData(item) {
  return {
    type: ACTIONS.SET_VEHICLE_DATA,
    item
  };
}

function clearVehicleData() {
  return {
    type: CLEAR_VEHICLE_DATA,
    item: {}
  };
}


function setFetching(isFetching = true) {
  return {
    type: FETCHING,
    isFetching
  }
}

function setFetchSuccessful() {
  return {
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

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [ACTIONS.SET_FORM_MODE]: (state, action) => ({...state, formMode: action.formMode}),
  [ACTIONS.SET_VEHICLE_DATA]: (state, action) => ({...state, item: action.item}),
  [CLEAR_VEHICLE_DATA]: (state, action) => ({...state, item: action.item}),
  [FETCHING]: (state, action) => ({...state, isFetching: action.isFetching, errors: action.errors}),
  [FETCH_SUCCESSFUL]: (state, action) => ({...state, isFetching: action.isFetching, errors: action.errors}),
  [FETCH_FAILED]: (state, action) => ({...state, isFetching: action.isFetching, errors: action.errors}),
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {isFetching: false, item: null};
export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
