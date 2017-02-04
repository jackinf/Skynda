import {ACTIONS} from "../constants/VehicleReport.constant";

export const setFormMode = (value) => ({
  type: ACTIONS.SET_FORM_MODE_REPORT,
  payload: value
});

export const setVehicleReportData = (value) => ({
  type: ACTIONS.SET_VEHICLE_DATA_REPORT,
  payload: value
});

export const setVehicleReports = (value) => ({
    type: ACTIONS.SET_VEHICLES_DATA_REPORT,
    payload: value
});
