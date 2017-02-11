import {ACTIONS} from "../constants/Vehicle.constant"

export const setVehicleReportsList = (value) => ({
  type: ACTIONS.SET_VEHICLE_REPORTS_DATA,
  payload: value
});

export const setVehicleReviewsList = (value) => ({
  type: ACTIONS.SET_VEHICLE_REVIEWS_DATA,
  payload: value
});
