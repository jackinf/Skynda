import {
  SET_INFO,
  SET_ERRORS
} from "../actions/SellNewCar.submit-form.action";

const initialState = {isSubmitting: false, errors: null, isSuccessfullySent: false};
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_INFO:
      return {
        ...state,
        isSubmitting: action.isSubmitting
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
