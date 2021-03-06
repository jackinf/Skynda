import {FORM_MODE, ROUTE_PARAMS, FORMS} from "../../../constants/VehicleReview.constant";
import {initialize, destroy} from "redux-form";
import {VehicleReviewService} from "../../../../../../../webServices"

export const LOAD_CREATE_SUCCESS  = 'VEHICLE_REVIEW/LOAD_CREATE_SUCCESS123';
export const LOAD_EDIT_REQUEST    = 'VEHICLE_REVIEW/LOAD_EDIT_REQUEST';
export const LOAD_EDIT_SUCCESS    = 'VEHICLE_REVIEW/LOAD_EDIT_SUCCESS';
export const LOAD_EDIT_FAILURE    = 'VEHICLE_REVIEW/LOAD_EDIT_FAILURE';

function loadCreateSuccess() {
  return {
    type: LOAD_CREATE_SUCCESS,
    isFetching: false,
    errors: {},
    formMode: FORM_MODE.ADDING_REVIEW
  }
}

function loadEditRequest() {
  return {
    type: LOAD_EDIT_REQUEST,
    isFetching: true,
    formMode: FORM_MODE.UPDATING_REVIEW
  }
}

function loadEditSuccess(item) {
  return {
    type: LOAD_EDIT_SUCCESS,
    isFetching: false,
    formMode: FORM_MODE.UPDATING_REVIEW,
    item
  }
}

function loadEditError(errors) {
  return {
    type: LOAD_EDIT_FAILURE,
    isFetching: false,
    errors,
    formMode: "-"
  }
}
/**
 * Private. Initializes an update form.
 *
 * Private. Fetches data from API and prepares update form.
 * @param id - vehicle ID.
 */
const loadEditForm = (id, onSuccess) => async (dispatch) => {
  dispatch(loadEditRequest());
  try {
    const item = await VehicleReviewService.loadUpdateForm(id);
    dispatch(loadEditSuccess(item));
    dispatch(initialize(FORMS.VEHICLE_FORM_REVIEW, item));
    if (onSuccess instanceof Function)
      onSuccess();
  } catch (error) {
    dispatch(loadEditError(error));
  }
};

// ------------------------------------
// Async Action Creators (Redux thunk)
// ------------------------------------

/**
 * Loads "Create new vehicle" or "Update existing vehicle" forms
 * @param id
 */
export default function load(id, onSuccess) {
  return (dispatch) => {
    dispatch(destroy(FORMS.VEHICLE_FORM_REVIEW));

    const formMode = id === ROUTE_PARAMS.values.NEW
      ? FORM_MODE.ADDING_REVIEW
      : !isNaN(parseInt(id))
        ? FORM_MODE.UPDATING_REVIEW : FORM_MODE.NONE;

    if (formMode === FORM_MODE.ADDING_REVIEW) {
      dispatch(loadCreateSuccess());
      dispatch(initialize(FORMS.VEHICLE_FORM_REVIEW));
      if (onSuccess instanceof Function)
        onSuccess();
    } else if (formMode == FORM_MODE.UPDATING_REVIEW) {
      dispatch(loadEditForm(id, onSuccess));
    } else {
      console.error("Invalid form mode");
    }
  }
};
