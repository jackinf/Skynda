import fetch from "isomorphic-fetch";
import remoteConfig from "store/remoteConfig";
import {handle, getDefaultHeaders} from "./serviceHandler";

export const EmailService = {
  submitAsync: function (info) {
    return handle(fetch(`${remoteConfig.remote}/api/email/sell-vehicle`, {
      method: "POST",
      headers: getDefaultHeaders(),
      body: JSON.stringify(info)
    }));
  }


};
