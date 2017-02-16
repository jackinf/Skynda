import fetch from "isomorphic-fetch";
import remoteConfig from "store/remoteConfig";
import {setFeaturesList} from "../actions";
import {REDUCER_KEYS} from "../Features.constant";

export default function deleteFeature(id) {
  return (dispatch, getState) => {
    let items = getState()[REDUCER_KEYS.FEATURES_LIST].items;
    dispatch(setFeaturesList({isFetching: true}));

    return fetch(`${remoteConfig.remote}/api/feature/${id}`, {
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
