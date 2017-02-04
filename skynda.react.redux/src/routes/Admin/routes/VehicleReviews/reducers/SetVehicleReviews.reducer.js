import {ACTIONS} from "../constants/VehicleReview.constant";

export function setVehicleReviews(value) {
  return {
    type: ACTIONS.SET_VEHICLES_DATA_REVIEW,
    payload: value
  };
}

export const actions = {
  setVehicleReviews
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [ACTIONS.SET_VEHICLES_DATA_REVIEW]: (state, action) => action.payload
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {isFetching: false, items: []};
export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
