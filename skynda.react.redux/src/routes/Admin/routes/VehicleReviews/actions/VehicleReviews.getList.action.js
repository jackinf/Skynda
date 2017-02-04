import fetch from "isomorphic-fetch";
import remoteConfig from "store/remoteConfig";
import {setVehicleReviews} from "../reducers/SetVehicleReviews.reducer";

export default function getList() {
  return (dispatch) => {
    dispatch(setVehicleReviews({isFetching: true}));

    return fetch(`${remoteConfig.remote}/api/vehicle-reviews`, {
      method: "GET",
      credentials: "include",
      headers: {"Accept": "application/json", "Content-Type": "application/x-www-form-urlencoded"}
    })
      .then(resp => resp.json())
      .then(resp => {
        dispatch(setVehicleReviews({isFetching: false, items: resp}));
      })
      .catch(err => {
        dispatch(setVehicleReviews({isFetching: false, items: []}));
      });
  };
}
