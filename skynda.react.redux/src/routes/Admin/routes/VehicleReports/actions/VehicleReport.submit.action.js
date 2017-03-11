import _ from "underscore";
import {browserHistory} from "react-router";
import {change} from "redux-form";
import {FORM_MODE, REDUCER_KEYS, FORMS} from "../constants/VehicleReport.constant";
import {VehicleReportService} from "../../../../../webServices";
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

function editSuccess() {
  return {
    type: EDIT_SUCCESS,
    isFetching: false,
    formMode: FORM_MODE.UPDATING
  }
}

function editFailure(errors) {
  return {
    type: EDIT_FAILURE,
    isFetching: false,
    formMode: FORM_MODE.UPDATING,
    errors
  }
}

function submitCreate(item, onSubmitCustom) {
  return async (dispatch) => {
    dispatch(addRequest());
    try {
      const resp = await VehicleReportService.createItem(item);
      dispatch(addSuccess());
      if (_.isFunction(onSubmitCustom)) {
        onSubmitCustom(null, resp.id);
      } else {
        dispatch(change(FORMS.VEHICLE_FORM_REPORT, "id", resp.id));
        browserHistory.replace("/admin/vehicle-report/" + resp.id);
        toastr.success("Success", "Create successful");
      }
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
      const resp = await VehicleReportService.updateItem(item);
      dispatch(editSuccess());
      if (_.isFunction(onSubmitCustom)) {
        onSubmitCustom(null, resp.id);
      } else {
        toastr.success("Success", "Update successful");
      }
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
      if (formMode === FORM_MODE.ADDING) {
        dispatch(submitCreate(formValues, onSubmitCustom))
      }
      else if (formMode === FORM_MODE.UPDATING) {
        dispatch(submitEdit(formValues, onSubmitCustom));
      }
    }catch (error){
      toastr.error("Oh no!", "Create/update failed. Check form values or contact support.", error);

    }

  }
}

// import {FORM_MODE} from "../constants/VehicleReport.constant";
// import {fromSpringToReduxFormError} from "../../../../../utils/formUtils";
// import {SubmissionError} from 'redux-form';
// import {browserHistory} from "react-router";
// import _ from "underscore";
// import {VehicleReportService} from "../../../../../webServices"
//
// /**
//  * Is executed on form submit. Not a redux action.
//  * @returns {any}
//  */
// export function formSubmit(data, formMode) {
//   return formMode == FORM_MODE.ADDING_REPORT
//     ? createVehicleAsync(data)
//     : updateVehicleAsync(data);
// }
//
// export const onFormSubmitSuccess = (response, onSubmitCustom = null) => {
//   if (response && response.success && !isNaN(parseInt(response.id)) && !isNaN(parseInt(response.vehicleId))) {
//     if (onSubmitCustom && _.isFunction(onSubmitCustom)) {
//       onSubmitCustom(null, response.vehicleId);
//     } else {
//       browserHistory.push(`/admin/vehicle-reports`);
//     }
//   }
// };
//
// export function onFormSubmitError() {
//   console.log("error");
// }
//
// /**
//  *
//  * @param data - vehicle-report input fields sent to the server
//  * @returns {*|Promise.<TResult>|Promise<U>|Thenable<U>}
//  */
// function createVehicleAsync(data) {
//   const promise = VehicleReportService.createVehicleAsync(data);
//   promise.then(resp => {
//     if (!resp.success) {
//       throw new SubmissionError(fromSpringToReduxFormError(resp.errors));
//     }
//     return resp;
//   }).catch(error => {
//     throw error;
//   })
// }
//
// /**
//  * Private. Updates vehicle-report
//  * @param data - vehicle-report input fields sent to the server
//  */
// function updateVehicleAsync(data) {
//   const promise = VehicleReportService.updateVehicleAsync(data);
//   promise.then(resp => {
//     if (!resp.success) {
//       throw new SubmissionError(fromSpringToReduxFormError(resp.errors));
//     }
//     return resp;
//   }).catch(error => {
//     throw error;
//   })
// }
