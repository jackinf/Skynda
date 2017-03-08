import {setVehicleReportsList} from "./index";
import {REDUCER_KEYS} from "../../../constants/Vehicles.constant";
import {VehicleReportService} from "../../../../../../../webServices"

export default function getList(vehicleId) {
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
