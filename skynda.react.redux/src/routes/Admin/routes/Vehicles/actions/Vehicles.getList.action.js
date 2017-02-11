import fetch from "isomorphic-fetch";
import remoteConfig from "store/remoteConfig";
import {setVehicles} from "../reducers/Vehicles.list.reducer";

export default function getList() {
  return (dispatch) => {
    dispatch(setVehicles({isFetching: true}));

    return fetch(`${remoteConfig.remote}/api/vehicles`, {
      method: "GET",
      credentials: "include",
      headers: {"Accept": "application/json", "Content-Type": "application/x-www-form-urlencoded"}
    })
      .then(resp => resp.json())
      .then(resp => {
        // console.info("Got vehicles", resp);
        dispatch(setVehicles({isFetching: false, items: resp}));
      })
      .catch(err => {
        console.error(err);
        dispatch(setVehicles({isFetching: false, items: []}));
      });
  };
}