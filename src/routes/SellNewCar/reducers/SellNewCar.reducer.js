/**
 * Created by jevgenir on 11/26/2016.
 */

const SET_INFO = "SELL_YOUR_CAR/SET_INFO";

export function submitAsync() {
  return (dispatch, getState) => {
      dispatch(setSubmittingStatus(true));
      setTimeout(() => {
        dispatch(setSubmittingStatus(false));
      }, 1000);
  }
}

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
