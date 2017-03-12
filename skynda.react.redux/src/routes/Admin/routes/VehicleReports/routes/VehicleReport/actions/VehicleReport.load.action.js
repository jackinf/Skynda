import {
  ROUTE_PARAMS,
  FORMS,
  FORM_MODE__ADDING_REPORT,
  FORM_MODE__UPDATING_REPORT,
  FORM_MODE__NONE_REPORT
} from "../../../constants/VehicleReport.constant";
import {initialize, destroy} from "redux-form";
import {VehicleReportService} from "../../../../../../../webServices"

export const LOAD_CREATE_SUCCESS  = 'VEHICLE_REPORT/LOAD_CREATE_SUCCESS123';
export const LOAD_EDIT_REQUEST    = 'VEHICLE_REPORT/LOAD_EDIT_REQUEST';
export const LOAD_EDIT_SUCCESS    = 'VEHICLE_REPORT/LOAD_EDIT_SUCCESS';
export const LOAD_EDIT_FAILURE    = 'VEHICLE_REPORT/LOAD_EDIT_FAILURE';

function loadCreateSuccess() {
  return {
    type: LOAD_CREATE_SUCCESS,
    isFetching: false,
    errors: {},
    formMode: FORM_MODE__ADDING_REPORT
  }
}

function loadEditRequest() {
  return {
    type: LOAD_EDIT_REQUEST,
    isFetching: true,
    formMode: FORM_MODE__UPDATING_REPORT
  }
}

function loadEditSuccess(item) {
  return {
    type: LOAD_EDIT_SUCCESS,
    isFetching: false,
    formMode: FORM_MODE__UPDATING_REPORT,
    item
  }
}

function loadEditError(errors) {
  return {
    type: LOAD_EDIT_FAILURE,
    isFetching: false,
    errors,
    formMode: FORM_MODE__UPDATING_REPORT
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
    const item = await VehicleReportService.loadUpdateForm(id);
    dispatch(loadEditSuccess(item));
    dispatch(initialize(FORMS.VEHICLE_FORM_REPORT, item));
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
    dispatch(destroy(FORMS.VEHICLE_FORM_REPORT));

    const formMode = id === ROUTE_PARAMS.values.NEW ? FORM_MODE__ADDING_REPORT
      : !isNaN(parseInt(id)) ? FORM_MODE__UPDATING_REPORT
        : FORM_MODE__NONE_REPORT;

    if (formMode === FORM_MODE__ADDING_REPORT) {
      dispatch(loadCreateSuccess());
      dispatch(initialize(FORMS.VEHICLE_FORM_REPORT));
      if (onSuccess instanceof Function)
        onSuccess();
    } else if (formMode == FORM_MODE__UPDATING_REPORT) {
      dispatch(loadEditForm(id, onSuccess));
    } else {
      console.error("Invalid form mode");
    }
  }
};
