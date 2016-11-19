/**
 * Created by jevgenir on 10/21/2016.
 */
import {ACTIONS} from "../constants/Vehicle.constant";

export function setVehicleData(value) {
  return {
    type: ACTIONS.SET_VEHICLE_DATA,
    payload: value
  };
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [ACTIONS.SET_VEHICLE_DATA]: (state, action) => action.payload
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {isFetching: false, car: null};
export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
