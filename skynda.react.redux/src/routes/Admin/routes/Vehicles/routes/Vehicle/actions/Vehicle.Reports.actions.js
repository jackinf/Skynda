import fetch from "isomorphic-fetch";
import remoteConfig from "store/remoteConfig";
import {setVehicleReportsList} from "./index";
import {REDUCER_KEYS} from "../../../constants/Vehicle.constant";

export function getList(vehicleId) {
  return (dispatch) => {
    if(!vehicleId){
      return null;
    }
    dispatch(setVehicleReportsList({isFetching: true}));
    return fetch(`${remoteConfig.remote}/api/vehicle-reports/${vehicleId}`, {
      method: "GET",
      credentials: "include",
      headers: {"Accept": "application/json", "Content-Type": "application/json"}
    })
      .then(resp => resp.json())
      .then(resp => {
        dispatch(setVehicleReportsList({isFetching: false, items: resp}));
      })
      .catch(err => {
        dispatch(setVehicleReportsList({isFetching: false, items: []}));
});
  };
}

export function deleteItem(id) {
  return (dispatch, getState) => {
    let items = getState()[REDUCER_KEYS.VEHICLE_REPORTS_DATA_LIST].items;
    return fetch(`${remoteConfig.remote}/api/vehicle-report/${id}`, {
      method: "DELETE",
      credentials: "include",
      headers: {"Accept": "application/json", "Content-Type": "application/json"}
    })
      .then(resp => resp.json())
      .then(resp => {
        items = items.filter(c => c.id !== id);
        dispatch(setVehicleReportsList({isFetching: false, items: items}));
      })
      .catch(err => {
        console.error(err);
      });
  };
}

export default {
  getList,
  deleteItem
};
