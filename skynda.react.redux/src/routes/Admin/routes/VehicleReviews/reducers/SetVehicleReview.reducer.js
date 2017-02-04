import {ACTIONS} from "../constants/VehicleReview.constant";

export function setVehicleReviewData(value) {
  return {
    type: ACTIONS.SET_VEHICLE_DATA_REVIEW,
    payload: value
  };
}


// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [ACTIONS.SET_VEHICLE_DATA_REVIEW]: (state, action) => action.payload
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {isFetching: false, car: null};
export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
