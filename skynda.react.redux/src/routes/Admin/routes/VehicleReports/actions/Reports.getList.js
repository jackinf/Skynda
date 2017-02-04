import fetch from "isomorphic-fetch";
import remoteConfig from "store/remoteConfig";
import {setVehicleReports} from "../actions";

export default function getList() {
  return (dispatch) => {
    dispatch(setVehicleReports({isFetching: true}));

    return fetch(`${remoteConfig.remote}/api/vehicle-reports`, {
      method: "GET",
      credentials: "include",
      headers: {"Accept": "application/json", "Content-Type": "application/x-www-form-urlencoded"}
    })
      .then(resp => resp.json())
      .then(resp => {
        dispatch(setVehicleReports({isFetching: false, items: resp}));
      })
      .catch(err => {
        dispatch(setVehicleReports({isFetching: false, items: []}));
      });
  };
}
