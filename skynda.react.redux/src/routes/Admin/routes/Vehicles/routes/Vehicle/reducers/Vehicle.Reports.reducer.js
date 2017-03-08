import {ACTIONS} from "../../../constants/Vehicles.constant";

export const setVehicleReportsList = (state = {isFetching: false, items: []}, action) => {
  switch (action.type) {
    case ACTIONS.SET_VEHICLE_REPORTS_DATA: {
      return action.payload;
    }

    default:
      return state;
  }
};
