import {FORM_MODE} from "../constants/VehicleReport.constant";
import remoteConfig from "store/remoteConfig";
import {fromSpringToReduxFormError} from "../../../../../utils/formUtils";
import {SubmissionError} from 'redux-form';
import {browserHistory} from "react-router";

/**
 * Is executed on form submit. Not a redux action.
 * @returns {any}
 */
export function formSubmit(data, formMode) {
  return formMode == FORM_MODE.ADDING_REPORT
    ? createVehicleAsync(data)
    : updateVehicleAsync(data);
}

export function onFormSubmitSuccess(isSuccess) {
  if (!!isSuccess) {
    browserHistory.push(`/admin/vehicle-reports`);
  }
}

export function onFormSubmitError() {
  console.log("error");
}

/**
 *
 * @param data - vehicle-report input fields sent to the server
 * @returns {*|Promise.<TResult>|Promise<U>|Thenable<U>}
 */
function createVehicleAsync(data) {
  console.log("createVehicleAsync", )
  return fetch(`${remoteConfig.remote}/api/vehicle-report`, {
    method: "POST",
    credentials: "include",
    headers: {"Accept": "application/json", "Content-Type": "application/json"},
    body: JSON.stringify(data)
  })
    .then(resp => resp.json())
    .then(resp => {
      console.log(resp);
      if (!resp.success) {
        throw new SubmissionError(fromSpringToReduxFormError(resp.errors));
      }
      return resp;
    })
}

/**
 * Private. Updates vehicle-report
 * @param data - vehicle-report input fields sent to the server
 */
function updateVehicleAsync(data) {
  return fetch(`${remoteConfig.remote}/api/vehicle-report/${data.id}`, {
    method: "PUT",
    credentials: "include",
    headers: {"Accept": "application/json", "Content-Type": "application/json"},
    body: JSON.stringify(data)
  })
    .then(resp => resp.json())
    .then(resp => {
      if (!resp.success) {
        throw new SubmissionError(fromSpringToReduxFormError(resp.errors));
      }
    })
}
