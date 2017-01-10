/**
 * Created by zekar on 1/10/2017.
 */

const SET_INFO = "CHECKOUT/SET_INFO";
const SET_ERRORS = "CHECKOUT/SET_ERRORS";
import remoteConfig from "../../../../store/remoteConfig";
import {toastr} from 'react-redux-toastr';

export const submitAsync = (info) => (dispatch) => {
  console.log(info);
  dispatch(setSubmittingStatus(true));
  dispatch(setErrors(null));

  return fetch(`${remoteConfig.remote}/api/email/subscribe`, {
    method: "POST",
    headers: {"Accept": "application/json", "Content-Type": "application/json"},
    body: JSON.stringify(info)
  })
    .then(resp => resp.json())
    .then(data => {
      console.info(data);
      if (data.success === false) {
        dispatch(setErrors(data.friendlyErrors));
      } else {
        toastr.success("Täname!", "Võtame sinuga 2 tööpäeva jooksul ühendust.");
      }
      dispatch(setSubmittingStatus(false));
    })
    .catch((error) => {
      dispatch(setSubmittingStatus(false));
    });
};

function setSubmittingStatus(value) {
  return {
    type: SET_INFO,
    isSubmitting: !!value
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
