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
  return VehicleService.createItem(data);
}

/**
 * Private. Updates vehicle
 * @param id - vehicle id
 * @param data - vehicle input fields sent to the server
 */
function updateItem(data) {
  return VehicleService.updateItem(data);
}
