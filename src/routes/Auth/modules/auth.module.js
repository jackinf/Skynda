/**
 * Created by jevgenir on 11/7/2016.
 */

const AUTH_SET_TOKEN = "auth/SET_TOKEN";
const AUTH_DISCARD_TOKEN = "auth/DISCARD_TOKEN";
const AUTH_SET_USER = "auth/SET_USER";

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

export default function auth(state = {}, action){
  switch(action.type){
    // saves the token into the state
    case AUTH_SET_TOKEN:
      return {
        ...state,
        token: action.token
      };
    // discards the current token (logout)
    case AUTH_DISCARD_TOKEN:
      return {};
    // saves the current user
    case AUTH_SET_USER:
      return {
        ...state,
        user: action.user
      };
    // as always, on default do nothing
    default:
      return state;
  }
}
