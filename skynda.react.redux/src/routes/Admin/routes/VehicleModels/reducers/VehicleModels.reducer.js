import {VehicleModelService} from "../../../../../webServices"
const SET_VEHICLE_MODELS_DATA = "VEHICLE_MODEL/SET_VEHICLE_MODELS_DATA";

export function getList() {
  return (dispatch) => {
    dispatch(setVehicleModels({isFetching: true}));
    const promise = VehicleModelService.getList();
    promise.then(resp => {
      dispatch(setVehicleModels({isFetching: false, items: resp}));
    })
    .catch(err => {
      dispatch(setVehicleModels({isFetching: false, items: []}));
      throw err;
    });
  }
};


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
