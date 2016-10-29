/**
 * Created by zekar on 10/23/2016.
 */
import {FORM_MODE} from "./../../constants/Car.constant";
import remoteConfig from "store/remoteConfig";
import {fromSpringToReduxFormError} from "../../../../../../utils/formUtils";
import {SubmissionError} from 'redux-form';

/**
 * Is executed on form submit. Not a redux action.
 * @returns {function(*, *)}
 */
export default function submitCarForm(data, formMode) {
  return formMode == FORM_MODE.ADDING
    ? createCarAsync(data)
    : updateCarAsync(1, data);  // TODO: get id.
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
    })
}

/**
 * Private. Updates car
 * @param id - car id
 * @param data - car input fields sent to the server
 */
function updateCarAsync(id, data) {
  return fetch(`${remoteConfig.remote}/api/car/${id}`, {
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
