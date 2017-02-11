/**
 * Created by jevgenir on 11/7/2016.
 */
import remoteConfig from "store/remoteConfig";
import {authSetUser} from "../modules/auth.module";
import _ from "underscore";
import * as jQuery from "jquery";

export default function submitLogin(data) {
  return (dispatch, getState) => {
    const loginFormValues = getState().form.loginForm.values;

    var formData = new FormData();
    formData.append("username", loginFormValues.username);
    formData.append("password", loginFormValues.password);
    formData.append("rememberme", loginFormValues.rememberme);

    jQuery.post({
      url:  `${remoteConfig.remote}/login`,
      data: formData,
      processData: false,
      contentType: false,
      xhrFields: {
        withCredentials: true
      },
      // headers: {"Content-Type": "application/x-www-form-urlencoded"},
      type: 'POST',
      success: function(data){
        // Hack. we don't expect to receive correct stuff from login response, ask for legit account info from other api
        if (_.isObject(data)) {
          fetch(`${remoteConfig.remote}/security/account`, {
            method: 'GET',
            credentials: 'include'
          })
            .then(resp => resp.json())
            .then(resp => {
            dispatch(authSetUser(resp));
          });
        } else {
          console.error("Logging in failed");
        }
      }
    });

    // return Promise.resolve(true); // TODO: fetch
  }
}
