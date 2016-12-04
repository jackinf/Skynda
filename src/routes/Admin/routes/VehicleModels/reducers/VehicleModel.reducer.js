/**
 * Created by jevgenir on 12/3/2016.
 */
import {FORM_MODE, REDUCER_KEYS} from "../constants/VehicleModel.constant";
import remoteConfig from "../../../../../store/remoteConfig";
import {SubmissionError, initialize} from "redux-form";
import fromSpringToReduxFormError from "../../../../../utils/formUtils/fromSpringToReduxFormError";

// ------------------------------------
// Actions
// ------------------------------------
const SET_FORM_MODE = "VEHICLE_MODEL/SET_FORM_MODE";
const SET_ITEM = "VEHICLE_MODEL/SET_ITEM";
const IS_FETCHING = "VEHICLE_MODEL/SET_IS_SUBMITTING";
const FETCH_SUCCESSFUL = "VEHICLE_MODEL/SET_SUBMISSION_SUCCESSFUL";
const FETCH_FAILED = "VEHICLE_MODEL/SET_SUBMISSION_FAILED";

// ------------------------------------
// Async Action Creators (Redux thunk)
// ------------------------------------

export const load = (formMode, id) => {
  return (dispatch, getState) => {
    if (formMode === FORM_MODE.ADDING) {
      dispatch(setFormMode(FORM_MODE.ADDING));

      // const fake = {
      //   "title": "1",
      //   "description": "2",
      //   "doors": 3,
      //   "drivetrain": {id: {value: 3, label: 'test'}
      //   },
      //   "engine": "4",
      //   "fuelType": {id: {value: 1}
      //   },
      //   "horsePower": 5,
      //   "modelCode": "6",
      //   "seats": 7,
      //   "transmission": {id: 1  },
      //   "vehicleBody": null,
      //   "vehicleManufacturer": {id: 1   },
      //   "year": 2000
      // };
      // dispatch(initialize("vehicleModelForm", fake, false));

    } else if (formMode == FORM_MODE.UPDATING) {
      dispatch(fetchItem(id));
    } else {
      console.error("Invalid form mode");
    }


  }
};

export const randomize = () => (dispatch) => {
  const fake = {
    "title": "1",
    "description": "2",
    "doors": 3,
    "drivetrain": {id: 3
    },
    "engine": "4",
    "fuelType": {id: 43
    },
    "horsePower": 5,
    "modelCode": "6",
    "seats": 7,
    "transmission": {id: 7  },
    "vehicleBody": null,
    "vehicleManufacturer": {id: 16   },
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
      dispatch(fetchSuccessful(item));
    })
    .catch((error) => {
      console.error("ERROR: ", error);
      dispatch(fetchFailed(error));
    });
};


// ------------------------------------
// Action Creators
// ------------------------------------

function setFormMode(formMode = FORM_MODE.NONE, isSubmitting = false) {
  return {
    type: SET_FORM_MODE,
    formMode,
    isSubmitting: isSubmitting
  }
}

function setItem(item) {
  return {
    type: SET_ITEM,
    item
  }
}

function isFetching() {
  return {
    type: IS_FETCHING,
    isSubmitting: true
  }
}

function fetchSuccessful(item, formMode = FORM_MODE.UPDATING) {
  return {
    type: FETCH_SUCCESSFUL,
    isSubmitting: false,
    item,
    formMode,
    errors: []
  }
}

function fetchFailed(errors) {
  return {
    type: FETCH_FAILED,
    isSubmitting: false,
    item: {},
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
        formMode: action.formMode,
        isSubmitting: action.isSubmitting
      };
    case SET_ITEM:
      return {
        ...state,
        type: action.type,
        item: action.item
      };
    case IS_FETCHING:
      return {
        ...state,
        type: action.type,
        isSubmitting: action.isSubmitting
      };
    case FETCH_SUCCESSFUL:
      return {
        ...state,
        type: action.type,
        isSubmitting: action.isSubmitting,
        item: action.item,
        formMode: action.formMode,
        errors: action.errors
      };
    case FETCH_FAILED:
      return {
        ...state,
        type: action.type,
        isSubmitting: action.isSubmitting,
        item: action.item,
        errors: action.errors
      };
    default:
      return state;
  }
}
