/**
 * Created by zekar on 3/6/2017.
 */
import {FORM_MODE, ROUTE_PARAMS, VEHICLE_MODEL_FORM} from "../../../constants/VehicleModel.constant";
import {destroy, initialize} from "redux-form";
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
    formMode: FORM_MODE.ADDING_MODEL
  }
}

function loadEditRequest() {
  return {
    type: LOAD_EDIT_REQUEST,
    isFetching: true,
    formMode: FORM_MODE.UPDATING_MODEL
  }
}

function loadEditSuccess() {
  return {
    type: LOAD_EDIT_SUCCESS,
    isFetching: false,
    formMode: FORM_MODE.UPDATING_MODEL
  }
}

function loadEditError(errors) {
  return {
    type: LOAD_EDIT_FAILURE,
    isFetching: false,
    errors,
    formMode: FORM_MODE.NONE_MODEL
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
    dispatch(initialize(VEHICLE_MODEL_FORM, item));
  } catch (error) {
    dispatch(loadEditError(error));
  }
};

export default function load(id) {
  return (dispatch) => {
    const formMode = id === ROUTE_PARAMS.values.NEW ? FORM_MODE.ADDING_MODEL : !isNaN(parseInt(id)) ? FORM_MODE.UPDATING_MODEL : FORM_MODE.NONE_MODEL;

    if (formMode === FORM_MODE.ADDING_MODEL) {
      dispatch(loadCreateSuccess());
    } else if (formMode == FORM_MODE.UPDATING_MODEL) {
      dispatch(loadEditForm(id));
    } else {
      console.error("Invalid form mode");
    }
  }
};
