import {
  SUBSCRIBE_PENDING,
  SUBSCRIBE_SUCCESS,
  SUBSCRIBE_FAILURE
} from "../actions/Subscribe.submit-form.action";
import {
  IS_SUBSCRIBE_DIALOG_CLOSED
} from "../actions/Subscribe.close-dialog.action";

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  errors: null,
  isFetching: false,
  isSubscribed: false
};
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SUBSCRIBE_PENDING:
    case SUBSCRIBE_SUCCESS:
    case SUBSCRIBE_FAILURE:
      return {...state, type: action.type, errors: action.errors, isFetching: action.isFetching, isSubscribed: action.isSubscribed};
    case IS_SUBSCRIBE_DIALOG_CLOSED:
      return {...state, type: action.type, isSubscribed: action.isSubscribed};
    default:
      return state;
  }
};
