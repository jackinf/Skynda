/**
 * Created by jevgenir on 12/3/2016.
 */
import {FORM_MODE, REDUCER_KEYS} from "../constants/VehicleModel.constant";
import remoteConfig from "../../../../../store/remoteConfig";
import {SubmissionError} from "redux-form";
import fromSpringToReduxFormError from "../../../../../utils/formUtils/fromSpringToReduxFormError";

// ------------------------------------
// Actions
// ------------------------------------
const SET_FORM_INFO = "VEHICLE_MODEL/SET_FORM_INFO";
const SET_IS_SUBMITTING = "VEHICLE_MODEL/SET_IS_SUBMITTING";
const SET_SUBMISSION_SUCCESSFUL = "VEHICLE_MODEL/SET_SUBMISSION_SUCCESSFUL";
const SET_SUBMISSION_FAILED = "VEHICLE_MODEL/SET_SUBMISSION_FAILED";

// ------------------------------------
// Async Action Creators (Redux thunk)
// ------------------------------------

export const load = (formMode, id) => {
  return (dispatch, getState) => {
    if (formMode === FORM_MODE.ADDING) {
      dispatch(loadCreateForm());
    } else if (formMode == FORM_MODE.UPDATING) {
      dispatch(loadUpdateForm(id));
    } else {
      console.error("Invalid form mode");
    }
  }
};

/**
 * Private. Initializes a create form.
 */
const loadCreateForm = () => (dispatch) => {
  dispatch(setFormMode(FORM_MODE.ADDING));
};

const loadUpdateForm = (id) => (dispatch) => {
  dispatch(setIsSubmitting());
  return fetch(`${remoteConfig.remote}/api/vehicle-model/${id}`, {
    method: "GET",
    credentials: "include",
    headers: {"Accept": "application/json", "Content-Type": "application/x-www-form-urlencoded"}
  })
    .then(resp => resp.json())
    .then(data => {
      dispatch(submissionSuccessful(data));
    })
    .catch((error) => {
      console.error("ERROR: ", error);
      dispatch(submissionFailed(error));
    });
};

export function submitAsync(data, formMode) {
  return (dispatch, getState) => {
    dispatch(formMode == FORM_MODE.ADDING ? createAsync(data) : updateAsync(data));

    setTimeout(() => {
      dispatch(submissionSuccessful());
    }, 1000);
  }
}

/**
 *
 * @param data - vehicle input fields sent to the server
 * @returns {*|Promise.<TResult>|Promise<U>|Thenable<U>}
 */
function createAsync(data) {
  return (dispatch) => {
    dispatch(setIsSubmitting());
    return fetch(`${remoteConfig.remote}/api/vehicle-model`, {
      method: "POST",
      credentials: "include",
      headers: {"Accept": "application/json", "Content-Type": "application/json"},
      body: JSON.stringify(data)
    })
      .then(resp => resp.json())
      .then(resp => {
        console.log(resp);
        if (!resp.success) {
          throw new SubmissionError(fromSpringToReduxFormError(resp.errors));
        }
        return resp;
      });
  }
}

/**
 * Private. Updates vehicle
 * @param id - vehicle id
 * @param data - vehicle input fields sent to the server
 */
function updateAsync(data) {
  return (dispatch) => {
    dispatch(setIsSubmitting());
    return fetch(`${remoteConfig.remote}/api/vehicle-model/${data.id}`, {
      method: "PUT",
      credentials: "include",
      headers: {"Accept": "application/json", "Content-Type": "application/json"},
      body: JSON.stringify(data)
    })
      .then(resp => resp.json())
      .then(resp => {
        if (!resp.success) {
          dispatch(submissionFailed(resp.errors));
          throw new SubmissionError(fromSpringToReduxFormError(resp.errors));
        }
      })
  };
}

// ------------------------------------
// Action Creators
// ------------------------------------

function setFormMode(formMode = FORM_MODE.NONE) {
  return {
    type: SET_FORM_INFO,
    formMode,
    isSubmitting: false
  }
}

function setIsSubmitting() {
  return {
    type: SET_IS_SUBMITTING,
    isSubmitting: true
  }
}

function submissionSuccessful(data, formMode = FORM_MODE.UPDATING) {
  return {
    type: SET_SUBMISSION_SUCCESSFUL,
    isSubmitting: true,
    formMode,
    data
  }
}

function submissionFailed(errors) {
  return {
    type: SET_SUBMISSION_FAILED,
    isSubmitting: false,
    data: {},
    errors
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {isSubmitting: false};
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_FORM_INFO:
      return {
        ...state,
        formMode: action.formMode,
        isSubmitting: false
      };
    case SET_IS_SUBMITTING:
      return {
        ...state,
        isSubmitting: action.isSubmitting
      };
    case SET_SUBMISSION_SUCCESSFUL:
      return {
        ...state,
        formMode: action.formMode,
        data: action.data
      };
    case SET_SUBMISSION_FAILED:
      return {
        ...state,
        errors: action.errors
      };
    default:
      return state;
  }
}
