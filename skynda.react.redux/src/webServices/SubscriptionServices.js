import fetch from "isomorphic-fetch";
import remoteConfig from "store/remoteConfig";
import {handle, getDefaultHeaders} from "./serviceHandler";

export const SubscriptionService = {
  sendSubscriptionEmail: function (item) {
    return handle(fetch(`${remoteConfig.remote}/api/subscribe`, {
      method: "POST",
      credentials: "include",
      headers: getDefaultHeaders(),
      body: JSON.stringify(item)
    }))
  }
};
