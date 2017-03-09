// import {ACTIONS} from "../../../constants/Vehicles.constant";
//
// export const setFeaturesList = (state = {isFetching: false, items: []}, action) => {
//   switch (action.type) {
//     case ACTIONS.SET_VEHICLE_FEATURES_DATA: {
//       return action.payload;
//     }
//
//     default:
//       return state;
//   }
// };

import {
  GET_LIST_REQUEST as GET_LIST_REQUEST_FEATURE,
  GET_LIST_SUCCESS as GET_LIST_SUCCESS_FEATURE,
  GET_LIST_FAILURE as GET_LIST_FAILURE_FEATURE
} from "../actions/Vehicle.features.get-list.action";

const ACTION_HANDLERS = {
  // FEATURES ACTION HANDLERS FOR REDUCER
  [GET_LIST_REQUEST_FEATURE]: (state, action) => ({...state, type: action.type, isFetching: action.isFetching, errors: action.errors}),
  [GET_LIST_SUCCESS_FEATURE]: (state, action) => ({...state, type: action.type, isFetching: action.isFetching, errors: action.errors, items: action.items}),
  [GET_LIST_FAILURE_FEATURE]: (state, action) => ({...state, type: action.type, isFetching: action.isFetching, errors: action.errors, items: action.items})
};

const initialState = {isFetching: false, item: [], errors: []};
// ------------------------------------
// Reducer
// ------------------------------------
export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
