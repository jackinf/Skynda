import {fromSpringToReduxFormError} from "utils/formUtils";
// import {SubmissionError} from 'redux-form';
import {FORM_MODE} from "../../../constants/Vehicle.constant";
import {VehicleService} from "../../../../../../../webServices"

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
  const promise = VehicleService.createItem(data);
  promise.then(resp => {
    // if (!resp.success) {
    //   throw new SubmissionError(fromSpringToReduxFormError(resp.errors));
    // }
    return resp;
  }).catch(error => {
    throw error;
  })
}

/**
 * Private. Updates vehicle
 * @param id - vehicle id
 * @param data - vehicle input fields sent to the server
 */
function updateItem(data) {
  console.info("Updating");
  const promise = VehicleService.updateItem(data);
  promise.then(resp => {
    // if (!resp.success) {
    //   throw new SubmissionError(fromSpringToReduxFormError(resp.errors));
    // }
    return resp;
  }).catch(error => {
    throw error;
  })
}
