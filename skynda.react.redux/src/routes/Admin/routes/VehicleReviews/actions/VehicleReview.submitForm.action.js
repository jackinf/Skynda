import {FORM_MODE} from "../constants/VehicleReview.constant";
import {fromSpringToReduxFormError} from "../../../../../utils/formUtils";
import {SubmissionError} from 'redux-form';
import {browserHistory} from "react-router";
import _ from "underscore";
import {VehicleReviewService} from "../../../../../webServices"

/**
 * Is executed on form submit. Not a redux action.
 * @returns {any}
 */
export function formSubmit(data, formMode) {
  return formMode == FORM_MODE.ADDING_REVIEW
    ? createVehicleAsync(data)
    : updateVehicleAsync(data);
}

export function onFormSubmitSuccess(response, onSubmitCustom = null) {
  if (response && response.success && !isNaN(parseInt(response.id)) && !isNaN(parseInt(response.vehicleId))) {
    if (onSubmitCustom && _.isFunction(onSubmitCustom)) {
      onSubmitCustom(null, response.vehicleId);
    } else {
      browserHistory.push(`/admin/vehicle-reviews`);
    }
  }
}

export function onFormSubmitError() {
  console.log("error");
}

/**
 *
 * @param data - vehicle-review input fields sent to the server
 * @returns {*|Promise.<TResult>|Promise<U>|Thenable<U>}
 */
function createVehicleAsync(data) {
  const promise = VehicleReviewService.createVehicleAsync(data);
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
 * Private. Updates vehicle-review
 * @param data - vehicle-review input fields sent to the server
 */
function updateVehicleAsync(data) {
    const promise = VehicleReviewService.updateVehicleAsync(data);
    promise.then(resp => {
      if (!resp.success) {
        throw new SubmissionError(fromSpringToReduxFormError(resp.errors));
      }
      return resp;
    }).catch(error => {
      throw error;
    })
}
