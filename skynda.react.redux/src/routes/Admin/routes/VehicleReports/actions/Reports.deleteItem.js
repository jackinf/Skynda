import {setVehicleReports} from "../actions";
import {REDUCER_KEYS} from "../constants/VehicleReport.constant";
import {VehicleReportService} from "../../../../../webServices"

export default function deleteItem(id) {
  return (dispatch, getState) => {
    let items = getState()[REDUCER_KEYS.VEHICLES_REPORTS_DATA].items;
    const promise = VehicleReportService.deleteItem(id);
    promise.then(resp => {
      items = items.filter(c => c.id !== id);
      dispatch(setVehicleReports({isFetching: false, items: items}));
    }).catch(err => {
      console.error(err);
      throw err;
    });
  };
}
