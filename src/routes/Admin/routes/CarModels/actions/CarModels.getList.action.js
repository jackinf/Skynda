/**
 * Created by jevgenir on 10/21/2016.
 */
import fetch from "isomorphic-fetch";
import remoteConfig from "store/remoteConfig";
import {setCarModels} from "./../reducers/CarModels.setData.reducer";

export default function getList() {
  return (dispatch) => {
    dispatch(setCarModels({isFetching: true}));

    return fetch(`${remoteConfig.remote}/api/car-models`, {
      method: "GET",
      headers: {"Accept": "application/json", "Content-Type": "application/json"}
    })
      .then(resp => resp.json())
      .then(resp => {
        dispatch(setCarModels({isFetching: false, cars: resp}));
      })
      .catch(err => {
        dispatch(setCarModels({isFetching: false, carModels: []}));
      });
  };
}
