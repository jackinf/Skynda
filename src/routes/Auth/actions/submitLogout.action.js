/**
 * Created by jevgenir on 11/8/2016.
 */
import remoteConfig from "store/remoteConfig";
import {authUnsetUser} from "../modules/auth.module";
import {browserHistory} from "react-router";

export default function submitLogout(redirect = false) {
  return (dispatch) => {
    return fetch(`${remoteConfig.remote}/logout`)
      .then(resp => {
        dispatch(authUnsetUser());
        browserHistory.push("login");
      })
  }
}
