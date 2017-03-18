/**
 * Created by jevgenir on 3/18/2017.
 */
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE
} from "../actions/submiLogin.action";
import {
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE
} from "../actions/submitLogout.action";
import {LOCAL_STORAGE_TOKEN_KEY, LOCAL_STORAGE_PROFILE_KEY} from '../../../utils/serviceHandler';

// The auth reducer. The starting state sets authentication
// based on a token being in local storage. In a real app,
// we would also want a util to check if the token is expired.
export default function auth(state = {
  isFetching: false,
  isAuthenticated: !!localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY),
  profile: localStorage.getItem(LOCAL_STORAGE_PROFILE_KEY) ? JSON.parse(localStorage.getItem(LOCAL_STORAGE_PROFILE_KEY)) : [],
  token: localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY) ? localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY) : '',
  errorMessage: null
}, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isFetching: true,
        isAuthenticated: false,
        user: action.creds,
        errorMessage: ""
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: true,
        profile: action.user,
        token: action.user.token,
        errorMessage: ""
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: false,
        errorMessage: action.errorMessage
      };

    case LOGOUT_REQUEST:
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isFetching: action.isFetching,
        isAuthenticated: action.isAuthenticated
      };
    case LOGOUT_FAILURE:
      return {
        ...state,
        isFetching: action.isFetching
      };
    default:
      return state
  }
}
