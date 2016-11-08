/**
 * Created by jevgenir on 11/8/2016.
 */
import remoteConfig from "store/remoteConfig";
import {authUnsetUser} from "../modules/auth.module";

export default function submitLogout() {
  return (dispatch) => {
    return fetch(`${remoteConfig.remote}/logout`)
      .then(resp => {
        dispatch(authUnsetUser());
      })
  }
}
