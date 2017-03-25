/**
 * Created by jevgenir on 3/25/2017.
 */

import {toastr} from 'react-redux-toastr';
import {EmailService} from "../../../webServices"

export const SET_INFO = "SELL_YOUR_CAR/SET_INFO";
export const SET_ERRORS = "SELL_YOUR_CAR/SET_ERRORS";

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
    dispatch(setSubmittingStatus(true, false));
    dispatch(setErrors(null));

    try {
      const data = await EmailService.submitAsyncSellVehicle(info);
      dispatch(setSubmittingStatus(false, true));
      toastr.success("Täname!", "Võtame sinuga 2 tööpäeva jooksul ühendust.");
    } catch (error) {
      dispatch(setSubmittingStatus(false, false));
      dispatch(setErrors(error.modelState));
    }
  };
}
