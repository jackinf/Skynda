/**
 * Created by zekar on 3/8/2017.
 */

import {setVehicleReportsList} from "./index";
import {REDUCER_KEYS} from "../../../constants/Vehicles.constant";
import {VehicleReportService} from "../../../../../../../webServices"

export default function deleteItem(id) {
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
