/**
 * Created by jevgenir on 10/21/2016.
 */
import fetch from "isomorphic-fetch";
import remoteConfig from "store/remoteConfig";
import {setVehicleModels} from "../reducers/VehicleModels.setData.reducer";

export default function getList() {
  return (dispatch) => {
    dispatch(setVehicleModels({isFetching: true}));

    return fetch(`${remoteConfig.remote}/api/vehicle-models`, {
      method: "GET",
      credentials: "include",
      headers: {"Accept": "application/json", "Content-Type": "application/x-www-form-urlencoded"}
    })
      .then(resp => resp.json())
      .then(resp => {
        dispatch(setVehicleModels({isFetching: false, items: resp}));
      })
      .catch(err => {
        dispatch(setVehicleModels({isFetching: false, items: []}));
      });
  };
}
