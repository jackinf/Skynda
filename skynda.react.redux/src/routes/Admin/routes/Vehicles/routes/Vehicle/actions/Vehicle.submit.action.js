import _ from "underscore";
import {browserHistory} from "react-router";
import {change} from "redux-form";
import {FORM_MODE, REDUCER_KEYS, VEHICLE_FORM_KEY} from "../../../constants/Vehicles.constant";
import {VehicleService} from "../../../../../../../webServices/VehicleServices";
import {toastr} from "react-redux-toastr";

export const ADD_REQUEST = 'VEHICLE/ADD_REQUEST';
export const ADD_SUCCESS = 'VEHICLE/ADD_SUCCESS';
export const ADD_FAILURE = 'VEHICLE/ADD_FAILURE';

export const EDIT_REQUEST = 'VEHICLE/EDIT_REQUEST';
export const EDIT_SUCCESS = 'VEHICLE/EDIT_SUCCESS';
export const EDIT_FAILURE = 'VEHICLE/EDIT_FAILURE';

function addRequest() {
  return {
    type: ADD_REQUEST,
    isFetching: true,
    formMode: FORM_MODE.ADDING
  }
}

function addSuccess() {
  return {
    type: ADD_SUCCESS,
    isFetching: false,
    formMode: FORM_MODE.UPDATING
  }
}

function addFailure(errors) {
  if (errors)
    window.scrollTo(0, 0);
  return {
    type: ADD_FAILURE,
    isFetching: false,
    formMode: FORM_MODE.ADDING,
    errors
  }
}

function editRequest() {
  return {
    type: EDIT_REQUEST,
    isFetching: true,
    formMode: FORM_MODE.UPDATING
  }
}

function editSuccess(item) {
  return {
    type: EDIT_SUCCESS,
    isFetching: false,
    formMode: FORM_MODE.UPDATING,
    item
  }
}

function editFailure(errors) {
  if (errors)
    window.scrollTo(0, 0);
  return {
    type: EDIT_FAILURE,
    isFetching: false,
    formMode: FORM_MODE.UPDATING,
    errors
  }
}

async function submitCreate(dispatch, item, onSubmitCustom) {
  dispatch(addRequest());
  try {
    const resp = await VehicleService.createItem(item);
    dispatch(addSuccess());
    if (_.isFunction(onSubmitCustom)) {
      onSubmitCustom(null, resp.id);
    } else {
      dispatch(change(VEHICLE_FORM_KEY, "id", resp.id));
      browserHistory.replace("/admin/vehicle/" + resp.id);

      toastr.success("Success", "Create successful");
      ga('send', 'event', 'Admin', 'vehicle', 'Added ' + resp.id);
      window.location = `/admin/vehicle/${resp.id}`;
    }
  } catch (error) {
    dispatch(addFailure(error.modelState));
    toastr.error("Oh no!", "Create failed: " +  error.message);
  }

}

async function submitEdit(dispatch, item, onSubmitCustom) {
  dispatch(editRequest());
  try {
    const resp = await VehicleService.updateItem(item);
    dispatch(editSuccess(resp));
    if (_.isFunction(onSubmitCustom)) {
      onSubmitCustom(null, resp.id);
    } else {
      toastr.success("Success", "Update successful");
      ga('send', 'event', 'Admin', 'vehicle', 'Updated ' + resp.id);
      window.location.reload();
    }
  } catch (error) {
    dispatch(editFailure(error.modelState));
    toastr.error("Oh no!", "Update failed " + error.message);
  }
}

export default function submit(onSubmitCustom) {
  return async (dispatch, getState) => {
    try {
      const state = getState();
      const formValues = state.form[VEHICLE_FORM_KEY].values;
      const formMode = state[REDUCER_KEYS.VEHICLE_DATA].formMode;
      if (formMode === FORM_MODE.ADDING) {
        await submitCreate(dispatch, formValues, onSubmitCustom);
      }
      else if (formMode === FORM_MODE.UPDATING) {
        await submitEdit(dispatch, formValues, onSubmitCustom);
      }
    }catch (error){
      toastr.error("Oh no!", "Create/update failed. Check form values or contact support.", error);

    }

  }
}
