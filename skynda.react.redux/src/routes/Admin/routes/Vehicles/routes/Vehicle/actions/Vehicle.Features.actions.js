import fetch from "isomorphic-fetch";
import remoteConfig from "store/remoteConfig";
import {setVehicleFeaturesList} from "./index";
import {REDUCER_KEYS} from "../../../constants/Vehicle.constant";

export function getList(vehicleId) {
  return (dispatch) => {
    if (!vehicleId) {
      return null;
    }
    dispatch(setVehicleFeaturesList({isFetching: true}));
    return fetch(`${remoteConfig.remote}/api/vehicle-reviews/${vehicleId}`, {
      method: "GET",
      credentials: "include",
      headers: {"Accept": "application/json", "Content-Type": "application/json"}
    })
      .then(resp => resp.json())
      .then(resp => {
        console.log(resp);
        dispatch(setVehicleFeaturesList({isFetching: false, items: resp}));
      })
      .catch(err => {
        dispatch(setVehicleFeaturesList({isFetching: false, items: []}));
      });
  };
}

export function deleteItem(id) {
  return (dispatch, getState) => {
    let items = getState()[REDUCER_KEYS.VEHICLE_FEATURES_DATA_LIST].items;
    return fetch(`${remoteConfig.remote}/api/vehicle-review/${id}`, {
      method: "DELETE",
      credentials: "include",
      headers: {"Accept": "application/json", "Content-Type": "application/json"}
    })
      .then(resp => resp.json())
      .then(resp => {
        items = items.filter(c => c.id !== id);
        dispatch(setVehicleFeaturesList({isFetching: false, items: items}));
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
