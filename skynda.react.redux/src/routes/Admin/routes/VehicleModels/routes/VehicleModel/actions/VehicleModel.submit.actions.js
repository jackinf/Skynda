/**
 * Created by zekar on 3/6/2017.
 */

import _ from "underscore";
import {browserHistory} from "react-router";
import {change} from "redux-form";
import {FORM_MODE, VEHICLE_MODEL_FORM, VEHICLE_MODEL_REDUCER_KEY} from "../../../constants/VehicleModel.constant";
import {VehicleModelService} from "../../../../../../../webServices/VehicleModelServices";
import {toastr} from "react-redux-toastr";

export const ADD_REQUEST = 'PARTNER_CONTACT_PERSON/ADD_REQUEST';
export const ADD_SUCCESS = 'PARTNER_CONTACT_PERSON/ADD_SUCCESS';
export const ADD_FAILURE = 'PARTNER_CONTACT_PERSON/ADD_FAILURE';

export const EDIT_REQUEST = 'PARTNER_CONTACT_PERSON/EDIT_REQUEST';
export const EDIT_SUCCESS = 'PARTNER_CONTACT_PERSON/EDIT_SUCCESS';
export const EDIT_FAILURE = 'PARTNER_CONTACT_PERSON/EDIT_FAILURE';

function addRequest() {
  return {
    type: ADD_REQUEST,
    isFetching: true
  }
}

function addSuccess() {
  return {
    type: ADD_SUCCESS,
    isFetching: false,
    formMode: FORM_MODE.UPDATING_MODEL
  }
}

function addError(errors) {
  return {
    type: ADD_FAILURE,
    isFetching: false,
    errors
  }
}

function editRequest() {
  return {
    type: EDIT_REQUEST,
    isFetching: true,
    formMode: FORM_MODE.UPDATING_MODEL
  }
}

function editSuccess() {
  return {
    type: EDIT_SUCCESS,
    isFetching: false,
    formMode: FORM_MODE.UPDATING_MODEL
  }
}

function editError(errors) {
  return {
    type: EDIT_FAILURE,
    isFetching: false,
    errors,
    formMode: FORM_MODE.UPDATING_MODEL
  }
}

function submitCreate(item, onSubmitCustom) {
  return async (dispatch) => {
    dispatch(addRequest());
    try {
      const resp = await VehicleModelService.createItem(item);
      dispatch(addSuccess());
      if (_.isFunction(onSubmitCustom)) {
        onSubmitCustom(null, resp.id);
      } else {
        dispatch(change("vehicleModelForm", "id", resp.id));
        browserHistory.replace("/admin/vehicle-model/" + resp.id);
        toastr.success("Success", "Create successful");
      }
    } catch (err) {
      dispatch(addError(err));
      toastr.error("Oh no!", "Create failed");
    }
  }
}

function submitEdit(item, onSubmitCustom) {
  return async (dispatch) => {
    dispatch(editRequest());
    try {
      const resp = await VehicleModelService.updateItem(item);
      dispatch(editSuccess());
      if (_.isFunction(onSubmitCustom)) {
        onSubmitCustom(null, resp.id);
      } else {
        toastr.success("Success", "Update successful");
      }
    } catch (err) {
      dispatch(editError(err));
      toastr.error("Oh no!", "Update failed");
    }
  }
}

export default function submit(onSubmitCustom) {
  return (dispatch, getState) => {
    const state = getState();
    const formValues = state.form[VEHICLE_MODEL_FORM].values;
    const formMode = state[VEHICLE_MODEL_REDUCER_KEY].formMode;

    if (formMode === FORM_MODE.ADDING_MODEL) {
      dispatch(submitCreate(formValues, onSubmitCustom))
    }
    else if (formMode === FORM_MODE.UPDATING_MODEL) {
      dispatch(submitEdit(formValues, onSubmitCustom));
    }
  }
}
