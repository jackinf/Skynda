import {FORM_MODE} from "../constants/VehicleReport.constant";
import {fromSpringToReduxFormError} from "../../../../../utils/formUtils";
import {SubmissionError} from 'redux-form';
import {browserHistory} from "react-router";
import _ from "underscore";
import {VehicleReportService} from "../../../../../webServices"

/**
 * Is executed on form submit. Not a redux action.
 * @returns {any}
 */
export function formSubmit(data, formMode) {
  return formMode == FORM_MODE.ADDING_REPORT
    ? createVehicleAsync(data)
    : updateVehicleAsync(data);
}

export const onFormSubmitSuccess = (response, onSubmitCustom = null) => {
  if (response && response.success && !isNaN(parseInt(response.id)) && !isNaN(parseInt(response.vehicleId))) {
    if (onSubmitCustom && _.isFunction(onSubmitCustom)) {
      onSubmitCustom(null, response.vehicleId);
    } else {
      browserHistory.push(`/admin/vehicle-reports`);
    }
  }
};

export function onFormSubmitError() {
  console.log("error");
}

/**
 *
 * @param data - vehicle-report input fields sent to the server
 * @returns {*|Promise.<TResult>|Promise<U>|Thenable<U>}
 */
function createVehicleAsync(data) {
  const promise = VehicleReportService.createVehicleAsync(data);
  promise.then(resp => {
    if (!resp.success) {
      throw new SubmissionError(fromSpringToReduxFormError(resp.errors));
    }
    return resp;
  }).catch(error => {
    throw error;
  })
}

/**
 * Private. Updates vehicle-report
 * @param data - vehicle-report input fields sent to the server
 */
function updateVehicleAsync(data) {
  const promise = VehicleReportService.updateVehicleAsync(data);
  promise.then(resp => {
    if (!resp.success) {
      throw new SubmissionError(fromSpringToReduxFormError(resp.errors));
    }
    return resp;
  }).catch(error => {
    throw error;
  })
}
