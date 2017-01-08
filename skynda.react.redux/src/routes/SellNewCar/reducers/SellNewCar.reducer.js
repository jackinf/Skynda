/**
 * Created by jevgenir on 11/26/2016.
 */

const SET_INFO = "SELL_YOUR_CAR/SET_INFO";
import remoteConfig from "../../../store/remoteConfig";
import {toastr} from 'react-redux-toastr';

export const submitAsync = (info) => (dispatch) => {
  console.log(info);
  dispatch(setSubmittingStatus(true));

  return fetch(`${remoteConfig.remote}/api/email/sell-vehicle`, {
    method: "POST",
    headers: {"Accept": "application/json", "Content-Type": "application/json"},
    body: JSON.stringify(info)
  })
    .then(resp => resp.json())
    .then(data => {
      console.info(data);
      dispatch(setSubmittingStatus(false));
      toastr.success("Täname!", "Võtame sinuga 2 tööpäeva jooksul ühendust.");
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

const initialState = {isSubmitting: false};
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_INFO:
      return {
        ...state,
        isSubmitting: action.isSubmitting
      };
    default:
      return state;
  }
}
