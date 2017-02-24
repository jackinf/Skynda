import fetch from "isomorphic-fetch";
import remoteConfig from "store/remoteConfig";
import {handle, getDefaultHeaders} from "./serviceHandler";

export const EmailService = {
  submitAsyncSellVehicle: function (info) {
    return handle(fetch(`${remoteConfig.remote}/api/email/sell-vehicle`, {
      method: "POST",
      headers: getDefaultHeaders(),
      body: JSON.stringify(info)
    }));
  },
  submitAsyncBuyVehicle: function (info) {
    return handle(fetch(`${remoteConfig.remote}/api/email/buy-vehicle`, {
      method: "POST",
      headers: getDefaultHeaders(),
      body: JSON.stringify(info)
    }));
  }
};
