import fetch from "isomorphic-fetch";
import remoteConfig from "store/remoteConfig";
import {handle, getDefaultHeaders} from "../utils/serviceHandler";

export const SubscriptionService = {
  sendSubscriptionEmail: function (item) {
    return handle(fetch(`${remoteConfig.remote}/api/subscribe`, {
      method: "POST",
      headers: getDefaultHeaders(),
      body: JSON.stringify(item)
    }))
  }
};
