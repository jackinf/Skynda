/**
 * Created by zekar on 10/23/2016.
 */
import {FORMS, FORM_MODE, REDUCER_KEYS} from "./../../constants/Car.constant";
import setCarData from "./Car.setCarData.action";
import remoteConfig from "store/remoteConfig";
import {fromSpringToReduxFormError} from "../../../../../../utils/formUtils";
import {SubmissionError} from 'redux-form';

/**
 * Is executed on form submit
 * @returns {function(*, *)}
 */
export default function submitCarForm() {
  return (dispatch, getState) => {
    const state = getState();
    const contextForm = state.form[FORMS.CAR_FORM];
    const values = contextForm.values || {};
    console.log("Submitted values: ", values);

    if (state[REDUCER_KEYS.FORM_MODE] == FORM_MODE.ADDING) {
      dispatch(createCarAsync(values));
    } else if (state[REDUCER_KEYS.FORM_MODE] == FORM_MODE.UPDATING) {
      // TODO: get id.
      dispatch(updateCarAsync(1, values));
    }
  };
}

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

export function submitTest(values) {
  console.log(values);
  return sleep(1000) // simulate server latency
    .then(() => {
      if (![ 'black' ].includes(values.colorInside)) {
        throw new SubmissionError({ colorInside1: 'BLACK', _error: 'LOL' })
      } else {
        window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`)
      }
    })
}

/**
 * Private. Creates car TODO: not a redux action...
 */
export function createCarAsync(data) {
  // (dispatch) =>

  // dispatch(setCarData({isFetching: true}));
  console.log(data);
  return fetch(`${remoteConfig.remote}/api/car`, {
    method: "POST",
    headers: {"Accept": "application/json", "Content-Type": "application/json"},
    body: JSON.stringify(data)
  })
    .then(resp => resp.json())
    .then(resp => {
      let err = {
        colorInside: 'User does not exist',
        colorOutside: 'Wrong password',
        _error: 'Login failed!'
      };
      // dispatch(setCarData({isFetching: false, data}));
      if (!resp.success) {
        // fromSpringToReduxFormError(resp.errors)
        throw new SubmissionError(err);
      }
    })
}

/**
 * Private. Updates car
 * @param id - car id
 */
const updateCarAsync = (id, data) => (dispatch) => {
  dispatch(setCarData({isFetching: true}));

  return fetch(`${remoteConfig.remote}/api/car/${id}`, {
    method: "PUT",
    headers: {"Accept": "application/json", "Content-Type": "application/json"},
    body: JSON.stringify(data)
  })
    .then(resp => resp.json())
    .then(data => {
      dispatch(setCarData({isFetching: false, data}));
    })
    .catch(err => {
      dispatch(setCarData({isFetching: false}));
    });
};
