import {ACTIONS} from "../constants/VehicleReview.constant";
import clear from "./VehicleReview.clear.action";
import load from "./VehicleReview.load.action";
import {formSubmit, onFormSubmitSuccess, onFormSubmitError} from "./VehicleReview.submitForm.action";
import getList from "./VehicleReviews.getList.action";
import deleteItem from "./VehicleReviews.deleteItem.action";

export const setFormMode = (value) => ({
  type: ACTIONS.SET_FORM_MODE_REVIEW,
  payload: value
});

export const setVehicleReviewData = (value) => ({
  type: ACTIONS.SET_VEHICLE_DATA_REVIEW,
  payload: value
});

export const setVehicleReviews = (value) => ({
  type: ACTIONS.SET_VEHICLES_DATA_REVIEW,
  payload: value
});

export {
  clear,
  load,
  formSubmit,
  onFormSubmitSuccess,
  onFormSubmitError,
  getList,
  deleteItem
}
