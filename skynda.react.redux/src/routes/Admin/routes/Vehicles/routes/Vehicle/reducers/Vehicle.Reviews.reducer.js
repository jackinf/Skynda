// import {ACTIONS} from "../../../constants/Vehicles.constant";
//
// export const setVehicleReviewsList = (state = {isFetching: false, items: []}, action) => {
//   switch (action.type) {
//     case ACTIONS.SET_VEHICLE_REVIEWS_DATA: {
//       return action.payload;
//     }
//
//     default:
//       return state;
//   }
// };


import {
  GET_LIST_REQUEST as GET_LIST_REQUEST_REVIEW,
  GET_LIST_SUCCESS as GET_LIST_SUCCESS_REVIEW,
  GET_LIST_FAILURE as GET_LIST_FAILURE_REVIEW
} from "../actions/Vehicle.reviews.get-list.action";

import {
  DELETE_REQUEST as DELETE_REQUEST_REVIEW,
  DELETE_SUCCESS as DELETE_SUCCESS_REVIEW,
  DELETE_FAILURE as DELETE_FAILURE_REVIEW
} from "../actions/Vehicle.reviews.delete-item.action";

const ACTION_HANDLERS = {

  // REVIEWS ACTION HANDLERS FOR REDUCER
  [GET_LIST_REQUEST_REVIEW]: (state, action) => ({...state, type: action.type, isFetching: action.isFetching, errors: action.errors}),
  [GET_LIST_SUCCESS_REVIEW]: (state, action) => ({...state, type: action.type, isFetching: action.isFetching, errors: action.errors, items: action.items}),
  [GET_LIST_FAILURE_REVIEW]: (state, action) => ({...state, type: action.type, isFetching: action.isFetching, errors: action.errors, items: action.items}),

  [DELETE_REQUEST_REVIEW]: (state, action) => ({...state, type: action.type, isFetching: action.isFetching, errors: action.errors}),
  [DELETE_SUCCESS_REVIEW]: (state, action) => ({...state, type: action.type, isFetching: action.isFetching, errors: action.errors}),
  [DELETE_FAILURE_REVIEW]: (state, action) => ({...state, type: action.type, isFetching: action.isFetching, errors: action.errors})
};


const initialState = {isFetching: false, item: [], errors: []};
// ------------------------------------
// Reducer
// ------------------------------------
export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
