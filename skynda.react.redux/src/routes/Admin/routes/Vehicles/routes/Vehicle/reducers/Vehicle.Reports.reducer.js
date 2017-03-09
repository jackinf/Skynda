// import {ACTIONS} from "../../../constants/Vehicles.constant";
//
// export const setVehicleReportsList = (state = {isFetching: false, items: []}, action) => {
//   switch (action.type) {
//     case ACTIONS.SET_VEHICLE_REPORTS_DATA: {
//       return action.payload;
//     }
//
//     default:
//       return state;
//   }
// };

import {
  GET_LIST_REQUEST as GET_LIST_REQUEST_REPORT,
  GET_LIST_SUCCESS as GET_LIST_SUCCESS_REPORT,
  GET_LIST_FAILURE as GET_LIST_FAILURE_REPORT
} from "../actions/Vehicle.reports.get-list.action";

import {
  DELETE_REQUEST as DELETE_REQUEST_REPORT,
  DELETE_SUCCESS as DELETE_SUCCESS_REPORT,
  DELETE_FAILURE as DELETE_FAILURE_REPORT
} from "../actions/Vehicle.reports.delete-item.action";

const ACTION_HANDLERS = {
// REPORTS ACTION HANDLERS FOR REDUCER
  [GET_LIST_REQUEST_REPORT]: (state, action) => ({
    ...state,
    type: action.type,
    isFetching: action.isFetching,
    errors: action.errors
  }),
  [GET_LIST_SUCCESS_REPORT]: (state, action) => ({
    ...state,
    type: action.type,
    isFetching: action.isFetching,
    errors: action.errors,
    items: action.items
  }),
  [GET_LIST_FAILURE_REPORT]: (state, action) => ({
    ...state,
    type: action.type,
    isFetching: action.isFetching,
    errors: action.errors,
    items: action.items
  }),

  [DELETE_REQUEST_REPORT]: (state, action) => ({
    ...state,
    type: action.type,
    isFetching: action.isFetching,
    errors: action.errors
  }),
  [DELETE_SUCCESS_REPORT]: (state, action) => ({
    ...state,
    type: action.type,
    isFetching: action.isFetching,
    errors: action.errors
  }),
  [DELETE_FAILURE_REPORT]: (state, action) => ({
    ...state,
    type: action.type,
    isFetching: action.isFetching,
    errors: action.errors
  })
};

const initialState = {isFetching: false, item: [], errors: []};
export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
