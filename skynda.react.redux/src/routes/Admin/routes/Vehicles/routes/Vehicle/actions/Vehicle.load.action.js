import {change} from "redux-form";
import {FORM_MODE, ROUTE_PARAMS, VEHICLE_FORM_KEY} from "../../../constants/Vehicles.constant";
import {initialize, destroy} from "redux-form";
import {VehicleService} from "../../../../../../../webServices"

export const LOAD_CREATE_SUCCESS = 'VEHICLE/LOAD_CREATE_SUCCESS123';
export const LOAD_EDIT_REQUEST = 'VEHICLE/LOAD_EDIT_REQUEST';
export const LOAD_EDIT_SUCCESS = 'VEHICLE/LOAD_EDIT_SUCCESS';
export const LOAD_EDIT_FAILURE = 'VEHICLE/LOAD_EDIT_FAILURE';

function loadCreateSuccess() {
  return {
    type: LOAD_CREATE_SUCCESS,
    isFetching: false,
    errors: {},
    formMode: FORM_MODE.ADDING
  }
}

function loadEditRequest() {
  return {
    type: LOAD_EDIT_REQUEST,
    isFetching: true,
    formMode: FORM_MODE.UPDATING
  }
}

function loadEditSuccess(item) {
  return {
    type: LOAD_EDIT_SUCCESS,
    isFetching: false,
    formMode: FORM_MODE.UPDATING,
    item
  }
}

function loadEditError(errors) {
  return {
    type: LOAD_EDIT_FAILURE,
    isFetching: false,
    errors,
    formMode: FORM_MODE.NONE
  }
}
/**
 * Private. Initializes an update form.
 *
 * Private. Fetches data from API and prepares update form.
 * @param id - vehicle ID.
*/
const loadEditForm = (id) => async (dispatch) => {
  dispatch(loadEditRequest());
  console.log("reload success");
  try {
    const item = await VehicleService.fetchAdminItem(id);
    dispatch(loadEditSuccess(item));
    dispatch(initialize(VEHICLE_FORM_KEY, item));
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
export default function load(id) {
  return (dispatch) => {
    dispatch(destroy(VEHICLE_FORM_KEY));

    const formMode = id === ROUTE_PARAMS.values.NEW
      ? FORM_MODE.ADDING
      : !isNaN(parseInt(id))
        ? FORM_MODE.UPDATING : FORM_MODE.NONE;

    if (formMode === FORM_MODE.ADDING) {
      dispatch(loadCreateSuccess());
      dispatch(initialize(VEHICLE_FORM_KEY, {
        colorOutsideHex: "#000000",
        colorInsideHex: "#000000"
      }));
      // dispatch(change(FORMS.VEHICLE_FORM_REPORT, "colorOutsideHex", "#000000"));
      // dispatch(change(FORMS.VEHICLE_FORM_REPORT, "colorInsideHex", "#000000"));
    } else if (formMode == FORM_MODE.UPDATING) {
      dispatch(loadEditForm(id));
    } else {
      console.error("Invalid form mode");
    }
  }
};
