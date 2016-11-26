/**
 * Created by jevgenir on 11/7/2016.
 */
import {setUser, unsetUser} from "../../../utils/userUtils";

const AUTH_SET_TOKEN = "auth/SET_TOKEN";
const AUTH_DISCARD_TOKEN = "auth/DISCARD_TOKEN";
const AUTH_SET_USER = "auth/SET_USER";
const AUTH_UNSET_USER = "auth/UNSET_USER";

export function authSetToken(token){
  return {
    type: AUTH_SET_TOKEN,
    token
  };
}

export function authDiscardToken(){
  return {
    type: AUTH_DISCARD_TOKEN
  };
}

export function authSetUser(user){
  return {
    type: AUTH_SET_USER,
    user
  };
}

export function authUnsetUser(){
  return {
    type: AUTH_UNSET_USER,
    user: null
  };
}

export default function auth(state = {isLoggedIn: false}, action){
  switch(action.type){
    case AUTH_SET_TOKEN:
      return {
        ...state,
        token: action.token
      };
    case AUTH_DISCARD_TOKEN:
      return {};
    case AUTH_SET_USER:
      setUser(action.user);
      return {
        ...state,
        user: action.user,
        isLoggedIn: !!action.user
      };
    case AUTH_UNSET_USER:
      unsetUser(null);
      return {
        ...state,
        user: action.user,
        isLoggedIn: false
      };
    default:
      return state;
  }
}
