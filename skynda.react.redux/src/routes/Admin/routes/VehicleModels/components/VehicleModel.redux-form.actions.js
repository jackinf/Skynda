/**
 * Created by jevgenir on 12/4/2016.
 */
import remoteConfig from "../../../../../store/remoteConfig";
import fromSpringToReduxFormError from "../../../../../utils/formUtils/fromSpringToReduxFormError";
import {SubmissionError} from "redux-form";
import {FORM_MODE} from "../constants/VehicleModel.constant";

// ------------------------------------
// Actions for redux-form
// ------------------------------------
export function onHandleSubmit(item, formInfo) {
  return formInfo.formMode === FORM_MODE.ADDING_MODEL
    ? createItem(item) : formInfo.formMode === FORM_MODE.UPDATING_MODEL
    ? updateItem(item) : null;
}

/**
 *
 * @param item - vehicle input fields sent to the server
 * @returns {*|Promise.<TResult>|Promise<U>|Thenable<U>}
 */
function createItem(item) {
  return fetch(`${remoteConfig.remote}/api/vehicle-model`, {
    method: "POST",
    credentials: "include",
    headers: {"Accept": "application/json", "Content-Type": "application/json"},
    body: JSON.stringify(item)
  })
    .then(resp => resp.json())
    .then(resp => {
      if (!resp.success) {
        throw new SubmissionError(fromSpringToReduxFormError(resp.errors));
      }
      return resp;
    });
}

/**
 * Private. Updates vehicle
 * @param id - vehicle id
 * @param item - vehicle input fields sent to the server
 */
function updateItem(item) {
  return fetch(`${remoteConfig.remote}/api/vehicle-model/${item.id}`, {
    method: "PUT",
    credentials: "include",
    headers: {"Accept": "application/json", "Content-Type": "application/json"},
    body: JSON.stringify(item)
  })
    .then(resp => resp.json())
    .then(resp => {
      if (!resp.success) {
        throw new SubmissionError(fromSpringToReduxFormError(resp.errors));
      }
      return resp;
    })
}
