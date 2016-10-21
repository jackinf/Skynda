/**
 * Created by jevgenir on 10/21/2016.
 */
import {CAR_CREATE_FORM} from "./../constants/Car.constant";
import fetch from "isomorphic-fetch";
import remoteConfig from "../../../../../store/remoteConfig";
import {setCarData} from "../reducers/SetCarData.reducer";

/**
 * Is executed on form submit
 * @returns {function(*, *)}
 */
export const submitCarForm = () => {
  return (dispatch, getState) => {
    const state = getState();
    const contextForm = state.form[CAR_CREATE_FORM];
    console.log("Submitted values: ", contextForm.values);

    // TODO: Create or update
  };
};

/**
 * Private. Creates car
 */
const createCarAsync = () => (dispatch, getState) => {
  dispatch(setCarData({isFetching: true}));

  return fetch(`${remoteConfig.remote}/api/car/${id}`, {
    method: "POST",
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

/**
 * Private. Updates car
 * @param id - car id
 */
const updateCarAsync = (id = 1) => (dispatch, getState) => {
  dispatch(setCarData({isFetching: true}));

  return fetch(`${remoteConfig.remote}/api/car/${id}`, {
    method: "PUT",
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
  submitCarForm
};
