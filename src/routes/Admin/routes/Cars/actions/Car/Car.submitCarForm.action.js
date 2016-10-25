/**
 * Created by zekar on 10/23/2016.
 */
import {FORMS, FORM_MODE, REDUCER_KEYS} from "./../../constants/Car.constant";
import setCarData from "./Car.setCarData.action";
import remoteConfig from "store/remoteConfig";

/**
 * Is executed on form submit
 * @returns {function(*, *)}
 */
export default function submitCarForm() {
  return (dispatch, getState) => {
    const state = getState();
    const contextForm = state.form[FORMS.CAR_FORM];
    console.log("Submitted values: ", contextForm.values);

    if (state[REDUCER_KEYS.FORM_MODE] == FORM_MODE.ADDING) {
      dispatch(createCarAsync(contextForm.values));
    } else if (state[REDUCER_KEYS.FORM_MODE] == FORM_MODE.UPDATING) {
      // TODO: get id.
      dispatch(updateCarAsync(1, contextForm.values));
    }
  };
}

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
      if (data.error) {
        console.error(data);
      }
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
