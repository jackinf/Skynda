/**
 * Created by jevgenir on 10/21/2016.
 */
import fetch from "isomorphic-fetch";
import remoteConfig from "store/remoteConfig";
import {setCarManufacturers} from "../reducers/CarManufacturers.setData.reducer";

export default function getList() {
  return (dispatch) => {
    dispatch(setCarManufacturers({isFetching: true}));

    return fetch(`${remoteConfig.remote}/api/car-manufacturers`, {
      method: "GET",
      headers: {"Accept": "application/json", "Content-Type": "application/json"}
    })
      .then(resp => resp.json())
      .then(resp => {
        dispatch(setCarManufacturers({isFetching: false, items: resp}));
      })
      .catch(err => {
        dispatch(setCarManufacturers({isFetching: false, items: []}));
      });
  };
}
