import {FORM_MODE, ROUTE_PARAMS} from "../constants/VehicleModel.constant";
import {change, destroy} from "redux-form";
import {browserHistory} from "react-router";
import _ from "underscore";
import {VehicleModelService} from "../../../../../webServices"

// ------------------------------------
// Actions
// ------------------------------------
const SET_FORM_MODE = "VEHICLE_MODEL/SET_FORM_MODE";
const SET_ITEM = "VEHICLE_MODEL/SET_ITEM";
const CLEAR_ITEM = "VEHICLE_MODEL/CLEAR_ITEM";
const FETCHING = "VEHICLE_MODEL/FETCHING";
const FETCH_SUCCESSFUL = "VEHICLE_MODEL/FETCH_SUCCESSFUL";
const FETCH_FAILED = "VEHICLE_MODEL/FETCH_FAILED";

// ------------------------------------
// Async Action Creators (Redux thunk)
// ------------------------------------

export const load = (id) => {
  return (dispatch) => {
    dispatch(destroy("vehicleModelForm"));
    const formMode = id === ROUTE_PARAMS.values.NEW
      ? FORM_MODE.ADDING_MODEL : !isNaN(parseInt(id))
      ? FORM_MODE.UPDATING_MODEL : FORM_MODE.NONE_MODEL;

    if (formMode === FORM_MODE.ADDING_MODEL) {
      dispatch(setFormMode(FORM_MODE.ADDING_MODEL));
      dispatch(clearItem());
    } else if (formMode == FORM_MODE.UPDATING_MODEL) {
      dispatch(fetchItem(id));
    } else {
      console.error("Invalid form mode");
    }
  }
};

export const randomize = (prevItem) => (dispatch) => {
  dispatch(destroy("vehicleModelForm"));
  const fake = {
    ...prevItem,
    "title": Math.random(),
    "description": Math.random(),
    "doors": 3,
    "drivetrain": {id: 3},
    "engine": Math.random(),
    "fuelType": {id: 43},
    "vehicleBody": {id: 52},
    "horsePower": 5,
    "modelCode": Math.random(),
    "seats": 7,
    "transmission": {id: 7},
    "vehicleManufacturer": {id: 16},
    "year": 2000
  };
  dispatch(setItem(fake));
};

/**
 *
 * @param resp
 * @param onSubmitCustom - custom callback function
 */
export const onHandleSubmitFinished = (resp, onSubmitCustom = null) => (dispatch) => {
  if (resp && resp.success && !isNaN(parseInt(resp.id))) {
    if (onSubmitCustom && _.isFunction(onSubmitCustom)) {
      onSubmitCustom(null, resp.id);
    } else {
      dispatch(change("vehicleModelForm", "id", resp.id));
      dispatch(setFormMode(FORM_MODE.UPDATING_MODEL));
      browserHistory.replace("/admin/vehicle-model/" + resp.id);
    }
  }
};

/**
 * Private. Initializes an update form.
 */
const fetchItem = (id) => (dispatch) => {
  dispatch(fetching());
  const promise = VehicleModelService.fetchItem(id);
  promise.then(item => {
    dispatch(setFetchSuccessful());
    dispatch(setFormMode(FORM_MODE.UPDATING_MODEL));
    dispatch(setItem(item));
  })
  .catch((error) => {
    dispatch(setFetchFailed(error));
    dispatch(setFormMode(FORM_MODE.NONE_MODEL));
    dispatch(clearItem());
  });
};


// ------------------------------------
// Action Creators
// ------------------------------------

function setFormMode(formMode = FORM_MODE.NONE) {
  return {
    type: SET_FORM_MODE,
    formMode
  }
}

function setItem(item) {
  return {
    type: SET_ITEM,
    item
  }
}

export function clearItem() {
  return {
    type: CLEAR_ITEM,
    item: {}
  }
}

function fetching(isFetching = true) {
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
// Reducer
// ------------------------------------
const initialState = {isSubmitting: false};
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_FORM_MODE:
      return {
        ...state,
        type: action.type,
        formMode: action.formMode
      };
    case SET_ITEM:
    case CLEAR_ITEM:
      return {
        ...state,
        type: action.type,
        item: action.item
      };
    case FETCHING:
      return {
        ...state,
        type: action.type,
        isFetching: action.isFetching
      };
    case FETCH_SUCCESSFUL:
      return {
        ...state,
        type: action.type,
        isFetching: action.isFetching,
        errors: action.errors
      };
    case FETCH_FAILED:
      return {
        ...state,
        type: action.type,
        isFetching: action.isFetching,
        item: action.item,
        errors: action.errors
      };
    default:
      return state;
  }
}
