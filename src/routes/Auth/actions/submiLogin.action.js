/**
 * Created by jevgenir on 11/7/2016.
 */
import remoteConfig from "store/remoteConfig";
import {authSetUser} from "../modules/auth.module";
import constants from "../../../utils/constants";

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
        console.log(data);
        dispatch(authSetUser(data));
        localStorage.setItem(constants.LOCAL_STORAGE_KEYS.SKYNDA_USER, JSON.stringify(data));
      }
    });

    // return Promise.resolve(true); // TODO: fetch
  }
}
