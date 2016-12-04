/**
 * Created by jevgenir on 12/4/2016.
 */
import remoteConfig from "../../../../../store/remoteConfig";
// import {isFetching, fetchSuccessful, fetchFailed} from "../reducers/VehicleModel.reducer";
import fromSpringToReduxFormError from "../../../../../utils/formUtils/fromSpringToReduxFormError";
import {SubmissionError} from "redux-form";

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

// ------------------------------------
// Actions for redux-form
// ------------------------------------
export function onHandleSubmit(item, formMode) {
  // return sleep(1000).then(() => {
  //   const errors = {_error: "Failed", modelCode: "Invalid"};
  //   throw new SubmissionError(errors);
  // });
  // return (dispatch, getState) => {

  return formMode == FORM_MODE.ADDING
    ? createItem(dispatch, item) : formMode == FORM_MODE.UPDATING
    ? updateItem(dispatch, item) : new Promise(resolve => {throw new SubmissionError(errors);});
  // }
}

/**
 *
 * @param item - vehicle input fields sent to the server
 * @returns {*|Promise.<TResult>|Promise<U>|Thenable<U>}
 */
function createItem(dispatch, item) {
  // return (dispatch) => {
  // dispatch(isFetching());
  return fetch(`${remoteConfig.remote}/api/vehicle-model`, {
    method: "POST",
    credentials: "include",
    headers: {"Accept": "application/json", "Content-Type": "application/json"},
    body: JSON.stringify(item)
  })
    .then(resp => resp.json())
    .then(resp => {
      console.log(resp);
      if (!resp.success) {
        const errors = fromSpringToReduxFormError(resp.errors);
        // dispatch(fetchFailed(errors));
        throw new SubmissionError(errors);
      } else {
        // dispatch(fetchSuccessful());
      }
      return resp;
    });
  // }
}

/**
 * Private. Updates vehicle
 * @param id - vehicle id
 * @param item - vehicle input fields sent to the server
 */
function updateItem(dispatch, item) {
  // return (dispatch) => {
  // dispatch(isFetching());
  return fetch(`${remoteConfig.remote}/api/vehicle-model/${item.id}`, {
    method: "PUT",
    credentials: "include",
    headers: {"Accept": "application/json", "Content-Type": "application/json"},
    body: JSON.stringify(item)
  })
    .then(resp => resp.json())
    .then(resp => {
      if (!resp.success) {
        // dispatch(fetchFailed(resp.errors));
        throw new SubmissionError(fromSpringToReduxFormError(resp.errors));
      }
    })
}
// }
