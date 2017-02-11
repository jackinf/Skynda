import fetch from "isomorphic-fetch";
import remoteConfig from "store/remoteConfig";
import {setFeaturesList} from "../actions";

export default function getFeatures() {
  return (dispatch) => {
    dispatch(setFeaturesList({isFetching: true}));

    return fetch(`${remoteConfig.remote}/api/features`, {
      method: "GET",
      credentials: "include",
      headers: {"Accept": "application/json", "Content-Type": "application/x-www-form-urlencoded"}
    })
      .then(resp => resp.json())
      .then(resp => {
        dispatch(setFeaturesList({isFetching: false, items: resp}));
      })
      .catch(err => {
        console.error(err);
        dispatch(setFeaturesList({isFetching: false, items: []}));
      });
  };
}
