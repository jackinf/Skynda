/**
 * Created by jevgenir on 10/26/2016.
 */
import fetch from "isomorphic-fetch";
import remoteConfig from "store/remoteConfig";

const SET_VEHICLE_MODELS_DATA = "VEHICLE_MODEL/SET_VEHICLE_MODELS_DATA";

export function getList() {
  return (dispatch) => {
    dispatch(setVehicleModels({isFetching: true}));

    return fetch(`${remoteConfig.remote}/api/vehicle-models`, {
      method: "GET",
      credentials: "include",
      headers: {"Accept": "application/json", "Content-Type": "application/x-www-form-urlencoded"}
    })
      .then(resp => resp.json())
      .then(resp => {
        dispatch(setVehicleModels({isFetching: false, items: resp}));
      })
      .catch(err => {
        dispatch(setVehicleModels({isFetching: false, items: []}));
      });
  };
}


export function setVehicleModels(value) {
  return {
    type: SET_VEHICLE_MODELS_DATA,
    payload: value
  };
}

export const actions = {
  setVehicleModels
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SET_VEHICLE_MODELS_DATA]: (state, action) => action.payload
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {isFetching: false, items: []};
export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
