import fetch from "isomorphic-fetch";
import remoteConfig from "store/remoteConfig";
import {handle, getDefaultHeaders} from "./serviceHandler";

export const VehicleReviewService = {
  loadUpdateForm: function (id) {
    return handle(fetch(`${remoteConfig.remote}/api/vehicle-review/${id}`, {
      method: "GET",
      credentials: "include",
      headers: getDefaultHeaders()
      // {"Accept": "application/json", "Content-Type": "application/x-www-form-urlencoded"}
    }));
  },
  createVehicleAsync: (data) => {
    return handle(fetch(`${remoteConfig.remote}/api/vehicle-review`, {
      method: "POST",
      credentials: "include",
      headers: getDefaultHeaders(),
      body: JSON.stringify(data)
    }));
  },
  updateVehicleAsync: (data) => {
    return handle(fetch(`${remoteConfig.remote}/api/vehicle-review/${data.id}`, {
      method: "PUT",
      credentials: "include",
      headers: getDefaultHeaders(),
      body: JSON.stringify(data)
    }));
  },
  deleteItem: function (id) {
    return handle(fetch(`${remoteConfig.remote}/api/vehicle-review/${id}`, {
      method: "DELETE",
      credentials: "include",
      headers: getDefaultHeaders()
    }));
  },
  getList: function(){
    return handle(fetch(`${remoteConfig.remote}/api/vehicle-reviews`, {
      method: "GET",
      credentials: "include",
      headers: getDefaultHeaders()
    }));
  },
  getVehicleReviews: function (vehicleId) {
    return handle(fetch(`${remoteConfig.remote}/api/vehicle-reviews/${vehicleId}`, {
      method: "GET",
      credentials: "include",
      headers: getDefaultHeaders()
    }));
  }

};
