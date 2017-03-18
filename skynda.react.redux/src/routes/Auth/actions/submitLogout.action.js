/**
 * Created by jevgenir on 11/8/2016.
 */
import {LOCAL_STORAGE_TOKEN_KEY, LOCAL_STORAGE_PROFILE_KEY} from '../../../utils/serviceHandler';

export const LOGOUT_REQUEST = 'AUTH/LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'AUTH/LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'AUTH/LOGOUT_FAILURE';

function logoutRequest() {
  return {
    type: LOGOUT_REQUEST,
    isFetching: true,
    isAuthenticated: true
  }
}

function logoutSuccess() {
  return {
    type: LOGOUT_SUCCESS,
    isFetching: false,
    isAuthenticated: false
  }
}

function logoutFailure() {
  return {
    type: LOGOUT_FAILURE,
    isFetching: false
  }
}

// Logs the user out
export function actionLogoutUser() {
  return dispatch => {
    dispatch(logoutRequest());
    // TODO: Fetch logout
    localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
    localStorage.removeItem(LOCAL_STORAGE_PROFILE_KEY);
    dispatch(logoutSuccess())
  }
}
