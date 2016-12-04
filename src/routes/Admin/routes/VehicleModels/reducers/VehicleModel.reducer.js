/**
 * Created by jevgenir on 12/3/2016.
 */
import {FORM_MODE, ROUTE_PARAMS} from "../constants/VehicleModel.constant";
import remoteConfig from "../../../../../store/remoteConfig";
import {reset, destroy} from "redux-form";

// ------------------------------------
// Actions
// ------------------------------------
const SET_FORM_MODE = "VEHICLE_MODEL/SET_FORM_MODE";
const SET_ITEM = "VEHICLE_MODEL/SET_ITEM";
const CLEAR_ITEM = "VEHICLE_MODEL/CLEAR_ITEM";
const IS_FETCHING = "VEHICLE_MODEL/IS_FETCHING";
const FETCH_SUCCESSFUL = "VEHICLE_MODEL/FETCH_SUCCESSFUL";
const FETCH_FAILED = "VEHICLE_MODEL/FETCH_FAILED";

// ------------------------------------
// Async Action Creators (Redux thunk)
// ------------------------------------

// export const load1 = (formMode, id) => {
//   return (dispatch, getState) => {
//     if (formMode === FORM_MODE.ADDING) {
//       dispatch(setFormMode(FORM_MODE.ADDING));
//       dispatch(clearItem());
//     } else if (formMode == FORM_MODE.UPDATING) {
//       dispatch(fetchItem(id));
//     } else {
//       console.error("Invalid form mode");
//     }
//   }
// };

export const load = (id) => {
  return (dispatch) => {
    dispatch(destroy("vehicleModelForm"));
    const formMode = id === ROUTE_PARAMS.values.NEW
      ? FORM_MODE.ADDING : !isNaN(parseInt(id))
      ? FORM_MODE.UPDATING : FORM_MODE.NONE;

    if (formMode === FORM_MODE.ADDING) {
      dispatch(setFormMode(FORM_MODE.ADDING));
      dispatch(clearItem());
    } else if (formMode == FORM_MODE.UPDATING) {
      dispatch(fetchItem(id));
    } else {
      console.error("Invalid form mode");
    }
  }
};

export const randomize = () => (dispatch) => {
  dispatch(destroy("vehicleModelForm"));
  const fake = {
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

export const onHandleSubmitFinished = (resp) => (dispatch) => {
  console.log(resp);
};

/**
 * Private. Initializes an update form.
 */
const fetchItem = (id) => (dispatch) => {
  dispatch(isFetching());
  return fetch(`${remoteConfig.remote}/api/vehicle-model/${id}`, {
    method: "GET",
    credentials: "include",
    headers: {"Accept": "application/json", "Content-Type": "application/x-www-form-urlencoded"}
  })
    .then(resp => resp.json())
    .then(item => {
      dispatch(fetchSuccessful());
      dispatch(setFormMode(FORM_MODE.UPDATING));
      dispatch(setItem(item));
    })
    .catch((error) => {
      console.error("ERROR: ", error);
      dispatch(fetchFailed(error));
      dispatch(setFormMode(FORM_MODE.NONE));
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

function isFetching() {
  return {
    type: IS_FETCHING,
    isFetching: true
  }
}

function fetchSuccessful() {
  return {
    type: FETCH_SUCCESSFUL,
    isFetching: false,
    errors: []  // no errors
  }
}

function fetchFailed(errors) {
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
    case IS_FETCHING:
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
