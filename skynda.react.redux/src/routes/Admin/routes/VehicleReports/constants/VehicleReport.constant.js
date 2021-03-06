﻿export const ACTIONS = {
  // For Vehicle
  SET_VEHICLE_DATA_REPORT: "VEHICLE/SET_VEHICLE_DATA_REPORT",
  SET_FORM_MODE_REPORT: "VEHICLE/SET_FORM_MODE_REPORT",

  // For Vehicles
  SET_VEHICLES_DATA_REPORT: "VEHICLES/SET_VEHICLES_DATA_REPORT"
};

export const FORMS = {
  DEFAULT_REDUX_FORM_KEY: "form", // Do not change the value! redux-forms depends on it.
  VEHICLE_FORM_REPORT: "adminReportAddUpdateForm",
};

export const ROUTE_PARAMS = {
  VEHICLE_REPORT_ID: "vehicleReportId",
  VEHICLE_ID: "vehicleId",
  values: {
    NEW: "new"
  }
};

export const FORM_MODE__READING_REPORT  = "READING_REPORT";
export const FORM_MODE__ADDING_REPORT   = "ADDING_REPORT";
export const FORM_MODE__UPDATING_REPORT = "UPDATING_REPORT";
export const FORM_MODE__NONE_REPORT     = "NONE_REPORT";

export const REDUCER_KEYS = {
  VEHICLE_REPORT_DATA: "vehicleReportData",
  VEHICLES_REPORTS_DATA: "vehicleReportsData",
  VEHICLES: "vehicles"
};
