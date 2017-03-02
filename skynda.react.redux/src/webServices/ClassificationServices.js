import fetch from "isomorphic-fetch";
import remoteConfig from "store/remoteConfig";
import {handle, getDefaultHeaders} from "./serviceHandler";

export const ClassificationService = {
  getClassificationList: function (typeName) {
    return handle(fetch(`${remoteConfig.remote}/api/classification/${typeName}`, {
      method: "GET",
      credentials: "include",
      headers: getDefaultHeaders()
    }));
  },
  getVehicleBoundClassificationList: function (type) {
    return handle(fetch(`${remoteConfig.remote}/api/classification/${type}/vehicle-bound`, {
      method: "GET",
      credentials: "include",
      headers: getDefaultHeaders()
    }));
  }

};
