import fetch from "isomorphic-fetch";
import remoteConfig from "store/remoteConfig";
import {setVehicleReports} from "../actions";
import {REDUCER_KEYS} from "../constants/VehicleReport.constant";

export default function deleteItem(id) {
  return (dispatch, getState) => {
    let items = getState()[REDUCER_KEYS.VEHICLES_REPORTS_DATA].items;

    return fetch(`${remoteConfig.remote}/api/vehicle-report/${id}`, {
      method: "DELETE",
      credentials: "include",
      headers: {"Accept": "application/json", "Content-Type": "application/json"}
    })
      .then(resp => resp.json())
      .then(resp => {
        items = items.filter(c => c.id !== id);
        dispatch(setVehicleReports({isFetching: false, items: items}));
      })
      .catch(err => {
        console.error(err);
      });
  };
}
