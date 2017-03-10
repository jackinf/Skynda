import {
  GET_LIST_REQUEST,
  GET_LIST_SUCCESS,
  GET_LIST_FAILURE
} from "../actions/Vehicle.features.get-list.action";

const ACTION_HANDLERS = {
  // FEATURES ACTION HANDLERS FOR REDUCER
  [GET_LIST_REQUEST]: (state, action) => ({...state, type: action.type, isFetching: action.isFetching, errors: action.errors}),
  [GET_LIST_SUCCESS]: function (state, action) {
    return {
      ...state, type: action.type, isFetching: action.isFetching, errors: action.errors, items: action.items
    };
  },
  [GET_LIST_FAILURE]: (state, action) => ({...state, type: action.type, isFetching: action.isFetching, errors: action.errors, items: action.items})
};

const initialState = {isFetching: false, items: [], errors: []};
// ------------------------------------
// Reducer
// ------------------------------------
export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
