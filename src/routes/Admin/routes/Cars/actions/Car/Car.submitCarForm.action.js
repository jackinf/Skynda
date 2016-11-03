/**
 * Created by zekar on 10/23/2016.
 */
import {FORM_MODE} from "./../../constants/Car.constant";
import remoteConfig from "store/remoteConfig";
import {fromSpringToReduxFormError} from "../../../../../../utils/formUtils";
import {SubmissionError} from 'redux-form';

/**
 * Is executed on form submit. Not a redux action.
 * @returns {any}
 */
export default function submitCarForm(data, formMode) {
  // TODO: Fix
  // data.filesToUpload = {
  //   imageFiles: data.imageFilesToUpload,
  //   faultsFiles: data.faultsFilesToUpload
  // };

  // return Promise.resolve(true);
  return formMode == FORM_MODE.ADDING
    ? createCarAsync(data)
    : updateCarAsync(data);
}

/**
 *
 * @param data - car input fields sent to the server
 * @returns {*|Promise.<TResult>|Promise<U>|Thenable<U>}
 */
function createCarAsync(data) {
  return fetch(`${remoteConfig.remote}/api/car`, {
    method: "POST",
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
 * Private. Updates car
 * @param id - car id
 * @param data - car input fields sent to the server
 */
function updateCarAsync(data) {
  return fetch(`${remoteConfig.remote}/api/car/${data.id}`, {
    method: "PUT",
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
