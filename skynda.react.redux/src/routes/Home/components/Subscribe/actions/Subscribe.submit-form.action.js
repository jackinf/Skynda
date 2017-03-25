/**
 * Created by jevgenir on 3/25/2017.
 */
import {EmailService} from "../../../../../webServices";
import {FORM_NAME__SUBSCRIBE} from "../constants/Subscribe.constants";

export const SUBSCRIBE_PENDING = "SUBSCRIBE_PENDING";
export const SUBSCRIBE_SUCCESS = "SUBSCRIBE_SUCCESS";
export const SUBSCRIBE_FAILURE = "SUBSCRIBE_FAILURE";

// ------------------------------------
// Actions Creators
// ------------------------------------
function subscribePending() {
  return {
    type: SUBSCRIBE_PENDING,
    errors: null,
    isFetching: true,
    isSubscribed: false
  };
}

function subscribeSuccess() {
  return {
    type: SUBSCRIBE_SUCCESS,
    errors: null,
    isFetching: false,
    isSubscribed: true
  };
}

function subscribeFailure(errors) {
  return {
    type: SUBSCRIBE_FAILURE,
    errors,
    isFetching: false,
    isSubscribed: false
  };
}

export default function submitForm() {
  return async (dispatch, getState) => {
    const state = getState();
    const formValues = state.form[FORM_NAME__SUBSCRIBE].values;

    try {
      dispatch(subscribePending());
      await EmailService.submitSubscribe(formValues);
      dispatch(subscribeSuccess());
    } catch (error) {
      dispatch(subscribeFailure(error.modelState));
    }
  };
}
