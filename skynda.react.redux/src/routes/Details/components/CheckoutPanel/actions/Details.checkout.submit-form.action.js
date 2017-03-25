/**
 * Created by jevgenir on 3/25/2017.
 */

import {toastr} from 'react-redux-toastr';
import {EmailService} from "../../../../../webServices"

export const SET_INFO = "CHECKOUT/SET_INFO";
export const SET_ERRORS = "CHECKOUT/SET_ERRORS";

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


export default function submitAsync(info) {
  return async (dispatch) => {
    try {
      dispatch(setErrors(null));
      dispatch(setSubmittingStatus(true, false));
      await EmailService.submitAsyncBuyVehicle(info);
      dispatch(setSubmittingStatus(false, true));
      toastr.success("Täname!", "Võtame sinuga 2 tööpäeva jooksul ühendust.");
    } catch (error) {
      dispatch(setErrors(error.modelState));
      dispatch(setSubmittingStatus(false, false));
    }
  };
};
