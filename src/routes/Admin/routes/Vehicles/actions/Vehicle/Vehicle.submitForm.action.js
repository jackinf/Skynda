/**
 * Created by zekar on 10/23/2016.
 */
import {FORM_MODE} from "../../constants/Vehicle.constant";
import remoteConfig from "store/remoteConfig";
import {fromSpringToReduxFormError} from "../../../../../../utils/formUtils";
import {SubmissionError} from 'redux-form';

/**
 * Is executed on form submit. Not a redux action.
 * @returns {any}
 */
export default function submitVehicleForm(data, formMode) {
  // TODO: Fix
  // data.filesToUpload = {
  //   imageFiles: data.imageFilesToUpload,
  //   faultsFiles: data.faultsFilesToUpload
  // };

  // return Promise.resolve(true);
  return formMode == FORM_MODE.ADDING
    ? createVehicleAsync(data)
    : updateVehicleAsync(data);
}

/**
 *
 * @param data - vehicle input fields sent to the server
 * @returns {*|Promise.<TResult>|Promise<U>|Thenable<U>}
 */
function createVehicleAsync(data) {
  return fetch(`${remoteConfig.remote}/api/vehicle`, {
    method: "POST",
    credentials: "include",
    headers: {"Accept": "application/json", "Content-Type": "text/plain"},
    body: "test"
  })
    .then(resp => {
      console.log(resp);
    });
    // .then(resp => resp.json())
    // .then(resp => {
    //   if (!resp.success) {
    //     throw new SubmissionError(fromSpringToReduxFormError(resp.errors));
    //   }
    //   return resp;
    // })
}

/**
 * Private. Updates vehicle
 * @param id - vehicle id
 * @param data - vehicle input fields sent to the server
 */
function updateVehicleAsync(data) {
  return fetch(`${remoteConfig.remote}/api/vehicle/${data.id}`, {
    method: "PUT",

    headers: {"Accept": "application/json", "Content-Type": "application/x-www-form-urlencoded"},
    body: JSON.stringify(data)
  })
    .then(resp => resp.json())
    .then(resp => {
      if (!resp.success) {
        throw new SubmissionError(fromSpringToReduxFormError(resp.errors));
      }
    })
}
