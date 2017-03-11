import {
  GET_LIST_REQUEST as GET_LIST_REQUEST_REPORT,
  GET_LIST_SUCCESS as GET_LIST_SUCCESS_REPORT,
  GET_LIST_FAILURE as GET_LIST_FAILURE_REPORT
} from "../actions/VehicleReports.get-list.action";

import {
  DELETE_REQUEST as DELETE_REQUEST_REPORT,
  DELETE_SUCCESS as DELETE_SUCCESS_REPORT,
  DELETE_FAILURE as DELETE_FAILURE_REPORT
} from "../actions/VehicleReports.delete-item.action";

const ACTION_HANDLERS = {
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

const initialState = {isFetching: false, items: [], errors: []};
export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
