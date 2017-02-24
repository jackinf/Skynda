const SET_INFO = "CHECKOUT/SET_INFO";
const SET_ERRORS = "CHECKOUT/SET_ERRORS";
import {toastr} from 'react-redux-toastr';
import {EmailService} from "../../../../webServices"

export const submitAsync = (info) => (dispatch) => {
  dispatch(setSubmittingStatus(true, false));
  dispatch(setErrors(null));
  const promise = EmailService.submitAsyncBuyVehicle(info);
  promise.then(data => {
    if (data.success === false) {
      dispatch(setErrors(data.friendlyErrors));
    } else {
      toastr.success("Täname!", "Võtame sinuga 2 tööpäeva jooksul ühendust.");
    }
    dispatch(setSubmittingStatus(false, true));
  }).catch((error) => {
    dispatch(setSubmittingStatus(false, false));
    throw error;
  });
};

function setSubmittingStatus(value, isSuccessfullySent) {
  return {
    type: SET_INFO,
    isSubmitting: !!value,
    isSuccessfullySent
  }
}

function setErrors(errors) {
  return {
    type: SET_ERRORS,
    errors: errors
  }
}

const initialState = {isSubmitting: false, errors: null};
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
