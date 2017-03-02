import fetch from "isomorphic-fetch";
import remoteConfig from "store/remoteConfig";
import {handle, getDefaultHeaders} from "./serviceHandler";

export const VehicleFeatureService = {
  deleteItem: function (id) {
    return handle(fetch(`${remoteConfig.remote}/api/vehicle-feature/${id}`, {
      method: "DELETE",
      headers: getDefaultHeaders()
    }));
  }
};
