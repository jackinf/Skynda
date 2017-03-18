/**
 * Created by jevgenir on 11/7/2016.
 */
import {AuthService} from "../../../webServices";
export const LOGIN_REQUEST = 'AUTH/LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'AUTH/LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'AUTH/LOGIN_FAILURE';

function loginRequest(creds) {
  return {
    type: LOGIN_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    creds
  }
}

function loginSuccess(user) {
  return {

    type: LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    user
  }
}

function loginError(errorMessage) {
  return {
    type: LOGIN_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    errorMessage
  }
}

export default function submitLogin(data) {
  return async (dispatch, getState) => {
    const state = getState();
    const loginFormValues = state.form.loginForm.values;

    dispatch(loginRequest(loginFormValues));

    try {

      const response = await AuthService.login(loginFormValues.username, loginFormValues.password, loginFormValues.rememberme);
      console.log(response);
      // loginSuccess(response);

    } catch (err) {
      console.log(err);
      dispatch(loginError(err.error_description ? err.error_description : err));
    }
  }
}
