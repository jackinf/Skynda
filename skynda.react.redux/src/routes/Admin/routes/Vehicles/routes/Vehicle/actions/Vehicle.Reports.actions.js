import {setVehicleReportsList} from "./index";
import {REDUCER_KEYS} from "../../../constants/Vehicle.constant";
import {VehicleReportService} from "../../../../../../../webServices"

export function getList(vehicleId) {
  return (dispatch) => {
    if (!vehicleId || vehicleId == "new") {
      return null;
    }

    dispatch(setVehicleReportsList({isFetching: true}));

    const promise = VehicleReportService.getVehicleReports(vehicleId);
    promise.then(resp => {
      dispatch(setVehicleReportsList({isFetching: false, items: resp}));
    }).catch(err => {
      dispatch(setVehicleReportsList({isFetching: false, items: []}));
      throw err;
    });
  };
}

export function deleteItem(id) {
  return (dispatch, getState) => {
    let items = getState()[REDUCER_KEYS.VEHICLE_REPORTS_DATA_LIST].items;
    const promise = VehicleReportService.deleteItem(id);
    promise.then(resp => {
      items = items.filter(c => c.id !== id);
      dispatch(setVehicleReportsList({isFetching: false, items: items}));
    }).catch(err => {
      console.error(err);
      throw err;
    });
  };
}

export default {
  getList,
  deleteItem
};
