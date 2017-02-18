import fetch from "isomorphic-fetch";
import remoteConfig from "store/remoteConfig";
import {setFeaturesList} from "./index";
import {REDUCER_KEYS} from "../../../constants/Vehicle.constant";

export function getList() {
  return (dispatch) => {
    dispatch(setFeaturesList({isFetching: true}));
    return fetch(`${remoteConfig.remote}/api/adminSelectFeatures`, {
      method: "GET",
      credentials: "include",
      headers: {"Accept": "application/json", "Content-Type": "application/json"}
    })
      .then(resp => resp.json())
      .then(resp => {
        dispatch(setFeaturesList({isFetching: false, items: resp}));
      })
      .catch(err => {
        dispatch(setFeaturesList({isFetching: false, items: []}));
      });
  };
}

export function deleteItem(id) {
  return (dispatch, getState) => {
    let items = getState()[REDUCER_KEYS.VEHICLE_FEATURES_DATA_LIST].items;
    return fetch(`${remoteConfig.remote}/api/vehicle-feature/${id}`, {
      method: "DELETE",
      credentials: "include",
      headers: {"Accept": "application/json", "Content-Type": "application/json"}
    })
      .then(resp => resp.json())
      .then(resp => {
        items = items.filter(c => c.id !== id);
        dispatch(setFeaturesList({isFetching: false, items: items}));
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
