import {ACTIONS, FORM_MODE} from "../constants/VehicleReport.constant";

export const setFormMode = (state = FORM_MODE.READING_REPORT, action) => {
  switch (action.type) {
    case ACTIONS.SET_FORM_MODE_REPORT: {
      return action.payload;
    }

    default:
      return state;
  }
};

export const setVehicleReportData = (state = {isFetching: false, car: null}, action) => {
  switch (action.type) {
    case ACTIONS.SET_VEHICLE_DATA_REPORT: {
      return action.payload;
    }

    default:
      return state;
  }
};

export const setVehicleReports = (state = {isFetching: false, items: []}, action) => {
  switch (action.type) {
    case ACTIONS.SET_VEHICLES_DATA_REPORT: {
      return action.payload;
    }

    default:
      return state;
  }
};
