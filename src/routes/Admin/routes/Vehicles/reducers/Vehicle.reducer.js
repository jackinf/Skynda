/**
 * Created by jevgenir on 10/21/2016.
 */
import {ACTIONS} from "../constants/Vehicle.constant";
import {browserHistory} from "react-router";

// ------------------------------------
// Actions
// ------------------------------------



// ------------------------------------
// Async Action Creators (Redux thunk)
// ------------------------------------

// export const onHandleSubmitFinished = (resp) => (dispatch, getState) => {
//   if (resp && resp.success && !isNaN(parseInt(resp.id))) {
//     dispatch(change("vehicleModelForm", "id", resp.id));
//     dispatch(setFormMode(FORM_MODE.UPDATING));
//     browserHistory.replace("/admin/vehicle-model/" + resp.id);
//   }
// };

// ------------------------------------
// Action Creators
// ------------------------------------

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
