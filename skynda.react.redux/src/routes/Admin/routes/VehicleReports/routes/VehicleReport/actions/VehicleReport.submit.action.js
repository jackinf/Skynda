import _ from "underscore";
import {browserHistory} from "react-router";
import {change} from "redux-form";
import {
  FORM_MODE__ADDING_REPORT,
  FORM_MODE__UPDATING_REPORT,
  FORM_MODE__NONE_REPORT,
  REDUCER_KEYS,
  FORMS
} from "../../../constants/VehicleReport.constant";
import {VehicleReportService} from "../../../../../../../webServices";
import {toastr} from "react-redux-toastr";

export const ADD_REQUEST = 'VEHICLE_REPORT/ADD_REQUEST';
export const ADD_SUCCESS = 'VEHICLE_REPORT/ADD_SUCCESS';
export const ADD_FAILURE = 'VEHICLE_REPORT/ADD_FAILURE';

export const EDIT_REQUEST = 'VEHICLE_REPORT/EDIT_REQUEST';
export const EDIT_SUCCESS = 'VEHICLE_REPORT/EDIT_SUCCESS';
export const EDIT_FAILURE = 'VEHICLE_REPORT/EDIT_FAILURE';

function addRequest() {
  return {
    type: ADD_REQUEST,
    isFetching: true,
    formMode: FORM_MODE__ADDING_REPORT
  }
}

function addSuccess() {
  return {
    type: ADD_SUCCESS,
    isFetching: false,
    formMode: FORM_MODE__UPDATING_REPORT
  }
}

function addFailure(errors) {
  return {
    type: ADD_FAILURE,
    isFetching: false,
    formMode: FORM_MODE__ADDING_REPORT,
    errors
  }
}

function editRequest() {
  return {
    type: EDIT_REQUEST,
    isFetching: true,
    formMode: FORM_MODE__UPDATING_REPORT
  }
}

function editSuccess() {
  return {
    type: EDIT_SUCCESS,
    isFetching: false,
    formMode: FORM_MODE__UPDATING_REPORT
  }
}

function editFailure(errors) {
  return {
    type: EDIT_FAILURE,
    isFetching: false,
    formMode: FORM_MODE__UPDATING_REPORT,
    errors
  }
}

function submitCreate(item, onSubmitCustom) {
  return async (dispatch) => {
    dispatch(addRequest());
    try {
      const resp = await VehicleReportService.createItem(item.vehicleId, item);
      dispatch(addSuccess());
      if (_.isFunction(onSubmitCustom)) {
        onSubmitCustom(null, resp.id);
      } else {
        dispatch(change(FORMS.VEHICLE_FORM_REPORT, "id", resp.id));
        browserHistory.replace("/admin/vehicle-report/" + resp.id);
      }
      toastr.success("Success", "Create successful");
    } catch (error) {
      dispatch(addFailure(error.modelState));
      toastr.error("Oh no!", "Create failed: " +  error.message);
    }
  }
}

function submitEdit(item, onSubmitCustom) {
  return async (dispatch) => {
    dispatch(editRequest());
    try {
      const resp = await VehicleReportService.updateItem(item.vehicleId, item.id, item);
      dispatch(editSuccess());
      if (_.isFunction(onSubmitCustom)) {
        onSubmitCustom(null, resp.id);
      }
      toastr.success("Success", "Update successful");
    } catch (error) {
      dispatch(editFailure(error.modelState));
      toastr.error("Oh no!", "Update failed " + error.message);
    }
  }
}

export default function submit(onSubmitCustom) {
  return (dispatch, getState) => {
    try {
      const state = getState();
      const formValues = state.form[FORMS.VEHICLE_FORM_REPORT].values;
      const formMode = state[REDUCER_KEYS.VEHICLE_REPORT_DATA].formMode;
      if (formMode === FORM_MODE__ADDING_REPORT) {
        dispatch(submitCreate(formValues, onSubmitCustom))
      }
      else if (formMode === FORM_MODE__UPDATING_REPORT) {
        dispatch(submitEdit(formValues, onSubmitCustom));
      }
    }catch (error){
      toastr.error("Oh no!", "Create/update failed. Check form values or contact support.", error);

    }

  }
}
