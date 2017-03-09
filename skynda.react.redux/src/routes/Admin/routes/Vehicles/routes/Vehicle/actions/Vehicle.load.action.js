/**
 * Created by zekar on 3/6/2017.
 */
import {FORM_MODE, ROUTE_PARAMS, FORMS} from "../../../constants/Vehicles.constant";
import {initialize} from "redux-form";
import {VehicleModelService} from "../../../../../../../webServices"

export const LOAD_CREATE_SUCCESS = 'VEHICLE_MODEL/LOAD_CREATE_SUCCESS123';
export const LOAD_EDIT_REQUEST = 'VEHICLE_MODEL/LOAD_EDIT_REQUEST';
export const LOAD_EDIT_SUCCESS = 'VEHICLE_MODEL/LOAD_EDIT_SUCCESS';
export const LOAD_EDIT_FAILURE = 'VEHICLE_MODEL/LOAD_EDIT_FAILURE';

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

function loadEditSuccess() {
  return {
    type: LOAD_EDIT_SUCCESS,
    isFetching: false,
    formMode: FORM_MODE.UPDATING
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
 */
const loadEditForm = (id) => async (dispatch) => {
  dispatch(loadEditRequest());
  try {
    const item = await VehicleModelService.fetchItem(id);
    dispatch(loadEditSuccess());
    dispatch(initialize(FORMS.VEHICLE_FORM, item));
  } catch (error) {
    dispatch(loadEditError(error));
  }
};

export default function load(id) {
  return (dispatch) => {
    const formMode = id === ROUTE_PARAMS.values.NEW
      ? FORM_MODE.ADDING
      : !isNaN(parseInt(id))
        ? FORM_MODE.UPDATING : FORM_MODE.NONE;

    if (formMode === FORM_MODE.ADDING) {
      dispatch(loadCreateSuccess());
    } else if (formMode == FORM_MODE.UPDATING) {
      dispatch(loadEditForm(id));
    } else {
      console.error("Invalid form mode");
    }
  }
};
