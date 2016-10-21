/**
 * Created by jevgenir on 10/21/2016.
 */
import fetch from "isomorphic-fetch";
import remoteConfig from "../../../../../store/remoteConfig";
import {setCarData} from "../reducers/SetCarData.reducer";

export const getCarAsync = (id = 1) => (dispatch, getState) => {
  dispatch(setCarData({isFetching: true}));

  return fetch(`${remoteConfig.remote}/api/car/${id}`, {
    method: "GET",
    headers: {"Accept": "application/json", "Content-Type": "application/json"}
  })
    .then(resp => resp.json())
    .then(data => {
      dispatch(setCarData({isFetching: false, data}));
    })
    .catch(err => {
      dispatch(setCarData({isFetching: false}));
    });
};

export const actions = {
  getCarAsync
};
