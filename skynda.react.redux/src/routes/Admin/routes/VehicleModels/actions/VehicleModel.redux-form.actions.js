import {FORM_MODE} from "../constants/VehicleModel.constant";
import {VehicleModelService} from "../../../../../webServices"

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
    return VehicleModelService.createItem(item);
}

/**
 * Private. Updates vehicle
 * @param id - vehicle id
 * @param item - vehicle input fields sent to the server
 */
function updateItem(item) {
    return VehicleModelService.updateItem(item);
}
