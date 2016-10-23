/**
 * Created by jevgenir on 10/21/2016.
 */
import fetch from "isomorphic-fetch";
import remoteConfig from "../../../../../store/remoteConfig";
import {FORMS, FORM_MODE} from "./../constants/Car.constant";
import {setCarData} from "../reducers/SetCar.reducer";
import {setFormMode} from "../reducers/SetFormMode.reducer";

export const clear = () => (dispatch) => {
  dispatch(setCarData({isFetching: false, data: null}));
};

export const load = (param) => (dispatch, getState) => {
  const currentFormMode = getState().formMode1;

  if (currentFormMode === FORM_MODE.ADDING) {
    dispatch(loadCreateForm());
  } else if (currentFormMode == FORM_MODE.UPDATING && !isNaN(parseInt(param))) {
    dispatch(loadUpdateForm(parseInt(param)));
  } else {
    console.error("Invalid form mode");
  }
};

/**
 * Is executed on form submit
 * @returns {function(*, *)}
 */
export const submitCarForm = () => (dispatch, getState) => {
  const state = getState();
  const contextForm = state.form[FORMS.CAR_FORM];
  console.log("Submitted values: ", contextForm.values);

  if (state.formMode1 == FORM_MODE.ADDING) {
    dispatch(createCarAsync(contextForm.values));
  } else if (state.formMode1 == FORM_MODE.UPDATING) {
    // TODO: get id.
    dispatch(updateCarAsync(1, contextForm.values));
  }
};

/**
 * Private. Initializes a create form.
 */
const loadCreateForm = () => (dispatch) => {
  console.log("LOAD CREATE FORM");
  dispatch(setCarData({isFetching: false, data: null}));
  dispatch(setFormMode(FORM_MODE.ADDING));
};

/**
 * Private. Fetches data from API and prepares update form.
 * @param param - car ID.
 */
const loadUpdateForm = (id) => (dispatch) => {
  console.log("LOAD UPDATE FORM");
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

      console.log(data);

      dispatch(setCarData({isFetching: false, data}));
      dispatch(setFormMode(FORM_MODE.UPDATING));
    })
    .catch((error) => {
      console.error("ERROR: ", error);
      dispatch(setCarData({isFetching: false}));
    });
};

/**
 * Private. Creates car
 */
const createCarAsync = (data) => (dispatch) => {
  dispatch(setCarData({isFetching: true}));

  return fetch(`${remoteConfig.remote}/api/car`, {
    method: "POST",
    headers: {"Accept": "application/json", "Content-Type": "application/json"},
    body: JSON.stringify(data)
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
const updateCarAsync = (id, data) => (dispatch) => {
  dispatch(setCarData({isFetching: true}));

  return fetch(`${remoteConfig.remote}/api/car/${id}`, {
    method: "PUT",
    headers: {"Accept": "application/json", "Content-Type": "application/json"},
    body: JSON.stringify(data)
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
  loadUpdateForm,
  loadCreateForm,
  submitCarForm
};
