import fetch from "isomorphic-fetch";
import remoteConfig from "store/remoteConfig";
import {setVehicleModels} from "../reducers/VehicleModels.reducer";
import {REDUCER_KEYS} from "../constants/VehicleModel.constant";

export default function deleteItem(id) {
  return (dispatch, getState) => {
    let items = getState()[REDUCER_KEYS.VEHICLE_MODELS_DATA].items;

    return fetch(`${remoteConfig.remote}/api/vehicle-model/${id}`, {
      method: "DELETE",
      credentials: "include",
      headers: {"Accept": "application/json", "Content-Type": "application/json"}
    })
      .then(resp => resp.json())
      .then(resp => {
        items = items.filter(c => c.id !== id);
        dispatch(setVehicleModels({isFetching: false, items: items}));
      })
      .catch(err => {
        console.error(err);
      });
  };
}
