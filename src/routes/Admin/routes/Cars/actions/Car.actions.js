/**
 * Created by jevgenir on 10/21/2016.
 */
import fetch from "isomorphic-fetch";
import remoteConfig from "../../../../../store/remoteConfig";
import {CAR_CREATE_FORM} from "./../constants/Car.constant";
import {setCarData} from "../reducers/SetCar.reducer";

export const getCarAsync = (id = 1) => (dispatch, getState) => {
  dispatch(setCarData({isFetching: true}));

  return fetch(`${remoteConfig.remote}/api/car/${id}`, {
    method: "GET",
    headers: {"Accept": "application/json", "Content-Type": "application/json"}
  })
    .then(resp => resp.json())
    .then(data => {

      // TEMP FIXES
      data["general"] = data["carGeneralDto"];
      data["reviews"] = data["review"] || [];
      for (let i = 0; i < data["reviews"].length; i++) {
        data["reviews"][i]["rating"] = parseInt(data["reviews"][i]["rating"]);
      }
      data["general"]["year"] = parseInt(data["general"]["year"]);
      data["performance"]["doors"] = parseInt(data["performance"]["doors"]);
      data["performance"]["compressionRatio"] = parseInt(data["performance"]["compressionRatio"]);
      data["performance"]["horsePower"] = parseInt(data["performance"]["horsePower"]);
      data["performance"]["size"] = parseInt(data["performance"]["size"]);
      data["performance"]["torque"] = parseInt(data["performance"]["torque"]);
      data["performance"]["totalValves"] = parseInt(data["performance"]["totalValves"]);
      data["safetyStars"] = parseInt(data["safetyStars"]);
      data["report"] = {
        categories: [],
        faults: []
      };

      delete data["carGeneralDto"];
      delete data["review"];

      dispatch(setCarData({isFetching: false, data}));
    })
    .catch((error) => {
      console.log("ERROR: ", error);
      dispatch(setCarData({isFetching: false}));
    });
};

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
  getCarAsync,
  submitCarForm
};
