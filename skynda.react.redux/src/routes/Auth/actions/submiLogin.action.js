/**
 * Created by jevgenir on 11/7/2016.
 */
import {AuthService} from "../../../webServices";
import {LOCAL_STORAGE_TOKEN_KEY, LOCAL_STORAGE_PROFILE_KEY} from "../../../utils/serviceHandler";
import {LOGIN_FORM} from "../constants/Login.constants";
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

export default function submitLogin() {
  return async (dispatch, getState) => {
    const state = getState();
    const loginFormValues = state.form[LOGIN_FORM].values;

    dispatch(loginRequest());

    try {

      const response = await AuthService.login(loginFormValues.username, loginFormValues.password, loginFormValues.rememberme);

      console.log(JSON.parse(response.roles));

      const user = {
        id: response.id,
        firstName: response.firstName,
        lastName: response.lastName,
        fullName: response.fullName,
        roles: JSON.parse(response.roles),
        token: response.access_token
      };

      localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, user.token);
      localStorage.setItem(LOCAL_STORAGE_PROFILE_KEY, JSON.stringify(user));
      dispatch(loginSuccess(user));
    } catch (err) {
      dispatch(loginError(err.error_description ? err.error_description : err));
    }
  }
}
