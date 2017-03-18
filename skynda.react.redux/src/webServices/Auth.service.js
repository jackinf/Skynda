/**
 * Created by jevgenir on 3/18/2017.
 */

import fetch from "isomorphic-fetch";
import remoteConfig from "store/remoteConfig";
import {handle, getDefaultHeaders} from "../utils/serviceHandler";

const AuthService = {
  login: function (username, password, rememberme = true) {
    const details = {
      'userName': username,
      'password': password,
      'rememberme': rememberme,
      'grant_type': 'password'
    };

    let formBody = [];
    for (let property in details) {
      const encodedKey = encodeURIComponent(property);
      const encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    return handle(fetch(`${remoteConfig.remote}/token`, {
      method: 'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      body: formBody
    }));
  }
};

export default AuthService;
