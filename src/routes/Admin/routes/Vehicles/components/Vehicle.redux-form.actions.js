/**
 * Created by jevgenir on 12/10/2016.
 */
import remoteConfig from "store/remoteConfig";
import {fromSpringToReduxFormError} from "../../../../../utils/formUtils";
import {SubmissionError} from 'redux-form';
import {FORM_MODE} from "../constants/Vehicle.constant";
import {toastr} from "react-redux-toastr";

// ------------------------------------
// Form submission
// ------------------------------------

/**
 * Is executed on form submit. Not a redux action.
 * @returns {any}
 */
export function onHandleSubmit(data, formMode) {
  return formMode == FORM_MODE.ADDING
    ? createItem(data)
    : updateItem(data);
}

/**
 *
 * @param data - vehicle input fields sent to the server
 * @returns {*|Promise.<TResult>|Promise<U>|Thenable<U>}
 */
function createItem(data) {
  console.info("Creating");
  return fetch(`${remoteConfig.remote}/api/vehicle`, {
    method: "POST",
    credentials: "include",
    headers: {"Accept": "application/json", "Content-Type": "application/json"},
    body: JSON.stringify(data)
  })
    .then(resp => resp.json())
    .then(resp => {
      console.log(resp);
      if (!resp.success) {
        toastr.error('Error', resp.message);
        throw new SubmissionError(fromSpringToReduxFormError(resp.errors));
      }
      return resp;
    })
}

/**
 * Private. Updates vehicle
 * @param id - vehicle id
 * @param data - vehicle input fields sent to the server
 */
function updateItem(data) {
  console.info("Updating");
  return fetch(`${remoteConfig.remote}/api/vehicle/${data.id}`, {
    method: "PUT",
    credentials: "include",
    headers: {"Accept": "application/json", "Content-Type": "application/json"},
    body: JSON.stringify(data)
  })
    .then(resp => resp.json())
    .then(resp => {
      if (!resp.success) {
        toastr.error('Error', resp.message);
        throw new SubmissionError(fromSpringToReduxFormError(resp.errors));
      }
      return resp;
    })
}
