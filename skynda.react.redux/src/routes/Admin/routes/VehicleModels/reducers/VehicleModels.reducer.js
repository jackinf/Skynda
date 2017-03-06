import {SET_VEHICLE_MODELS_DATA} from "../actions/VehicleModels.get-list.actions";

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
