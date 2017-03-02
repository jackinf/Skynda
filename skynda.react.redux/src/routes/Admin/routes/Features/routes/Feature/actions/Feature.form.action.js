import {FORM_MODE} from "../Feature.constant";
import {fromSpringToReduxFormError} from "../../../../../../../utils/formUtils";
import {SubmissionError} from 'redux-form';
import {browserHistory} from "react-router";
import _ from "underscore";
import {FeatureService} from "../../../../../../../webServices"

/**
 * Is executed on form submit. Not a redux action.
 * @returns {any}
 */
export function formSubmit(data, formMode) {
  return formMode == FORM_MODE.ADDING_FEATURE
    ? createFeatureAsync(data)
    : updateFeatureAsync(data);
}

export function onFormSubmitSuccess(response, getFeatures, onSubmitCustom = null) {
  if (response && response.success && !isNaN(parseInt(response.id))) {
    if (onSubmitCustom && _.isFunction(onSubmitCustom) && !isNaN(parseInt(response.vehicleId))) {
      onSubmitCustom(null, response.vehicleId);
    } else {
      getFeatures();
      browserHistory.push(`/admin/feature`);
    }
  }
}


/**
 *
 * @param data - feature input fields sent to the server
 * @returns {*|Promise.<TResult>|Promise<U>|Thenable<U>}
 */
function createFeatureAsync(data) {
  const promise = FeatureService.createFeatureAsync(data);
  promise.then(resp => {
    //TODO catch validation errors & display
    return resp;
  }).catch(err => {
    throw err;
  })
}

/**
 * Private. Updates feature
 * @param data - feature input fields sent to the server
 */
function updateFeatureAsync(data) {
  const promise = FeatureService.updateFeatureAsync(data);
  promise.then(resp => {
    //TODO catch validation errors & display
    return resp;
  }).catch(err => {
    throw err;
  })
}
