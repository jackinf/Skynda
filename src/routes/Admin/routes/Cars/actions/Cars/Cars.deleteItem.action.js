/**
 * Created by jevgenir on 10/26/2016.
 */
import fetch from "isomorphic-fetch";
import remoteConfig from "store/remoteConfig";
import {setCars} from "./../../reducers/SetCars.reducer";
import {REDUCER_KEYS} from "../../constants/Car.constant";

export default function deleteItem(id) {
  return (dispatch, getState) => {
    let items = getState()[REDUCER_KEYS.CARS_DATA].items;
    // dispatch(setCars({isFetching: true}));

    return fetch(`${remoteConfig.remote}/api/car/${id}`, {
      method: "DELETE",
      headers: {"Accept": "application/json", "Content-Type": "application/json"}
    })
      .then(resp => resp.json())
      .then(resp => {
        items = items.filter(c => c.id !== id);
        dispatch(setCars({isFetching: false, items: items}));
      })
      .catch(err => {
        console.error(err);
      });
  };
}
