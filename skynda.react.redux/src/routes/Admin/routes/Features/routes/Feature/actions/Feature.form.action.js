import {FORM_MODE} from "../Feature.constant";
import remoteConfig from "store/remoteConfig";
import {fromSpringToReduxFormError} from "../../../../../../../utils/formUtils";
import {SubmissionError} from 'redux-form';
import {browserHistory} from "react-router";
import _ from "underscore";
/**
 * Is executed on form submit. Not a redux action.
 * @returns {any}
 */
export function formSubmit(data, formMode) {
  return formMode == FORM_MODE.ADDING_FEATURE
    ? createFeatureAsync(data)
    : updateFeatureAsync(data);
}

export function onFormSubmitSuccess(response, onSubmitCustom = null) {
  if (response && response.success && !isNaN(parseInt(response.id)) && !isNaN(parseInt(response.vehicleId))) {
    if (onSubmitCustom && _.isFunction(onSubmitCustom)) {
      onSubmitCustom(null, response.vehicleId);
    } else {
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
  return fetch(`${remoteConfig.remote}/api/feature`, {
    method: "POST",
    credentials: "include",
    headers: {"Accept": "application/json", "Content-Type": "application/json"},
    body: JSON.stringify(data)
  })
    .then(resp => resp.json())
    .then(resp => {
      if (!resp.success) {
        throw new SubmissionError(fromSpringToReduxFormError(resp.errors));
      }
      return resp;
    })
}

/**
 * Private. Updates feature
 * @param data - feature input fields sent to the server
 */
function updateFeatureAsync(data) {
  return fetch(`${remoteConfig.remote}/api/feature/${data.id}`, {
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
      return resp;
    })
}
