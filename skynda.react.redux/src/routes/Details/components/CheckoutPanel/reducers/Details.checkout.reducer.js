import {
  SET_INFO,
  SET_ERRORS
} from "../actions/Details.checkout.submit-form.action";

const initialState = {isSubmitting: false, errors: null, isSuccessfullySent: false};
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_INFO:
      return {
        ...state,
        isSubmitting: action.isSubmitting,
        isSuccessfullySent: action.isSuccessfullySent
      };
    case SET_ERRORS:
      return {
        ...state,
        errors: action.errors
      };
    default:
      return state;
  }
}
