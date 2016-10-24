/**
 * Created by jevgenir on 10/21/2016.
 */
import fetch from "isomorphic-fetch";
import remoteConfig from "store/remoteConfig";
import {setCars} from "./../../reducers/SetCars.reducer";

const useFallbackDemoData = true;

export default function getList() {
  return (dispatch) => {
    dispatch(setCars({isFetching: true}));

    return fetch(`${remoteConfig.remote}/api/cars`, {
      method: "GET",
      headers: {"Accept": "application/json", "Content-Type": "application/json"}
    })
      .then(resp => resp.json())
      .then(resp => {
        dispatch(setCars({isFetching: false, cars: resp}));
      })
      .catch(err => {
        var demoCars = useFallbackDemoData ? [{id: 1, name: "BMW"}] : [];
        dispatch(setCars({isFetching: false, cars: demoCars}));
      });
  };
}
