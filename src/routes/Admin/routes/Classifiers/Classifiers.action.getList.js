/**
 * Created by jevgenir on 11/13/2016.
 */
import fetch from "isomorphic-fetch";
import remoteConfig from "store/remoteConfig";
import {getClassifiers} from "./Classifiers.module";

export function getList() {
  return (dispatch) => {
    dispatch(getClassifiers({isFetching: true}));

    return fetch(`${remoteConfig.remote}/api/classifications/COLOR`, {
      method: "GET",
      credentials: "include",
      headers: {"Accept": "application/json", "Content-Type": "application/x-www-form-urlencoded"}
    })
      .then(resp => resp.json())
      .then(resp => {
        dispatch(getClassifiers({isFetching: false, items: resp}));
      })
      .catch(err => {
        console.error(err);
        dispatch(getClassifiers({isFetching: false, items: []}));
      });
  };
}
