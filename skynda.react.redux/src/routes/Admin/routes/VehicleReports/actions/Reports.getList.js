import {setVehicleReports} from "../actions";
import {VehicleReportService} from "../../../../../webServices"

export default function getList() {
  return (dispatch) => {
    dispatch(setVehicleReports({isFetching: true}));
    const promise = VehicleReportService.getList();
    promise.then(resp => {
      dispatch(setVehicleReports({isFetching: false, items: resp}));
    }).catch(err => {
      dispatch(setVehicleReports({isFetching: false, items: []}));
      throw err;
    });
  };
}
