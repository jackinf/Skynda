import fetch from "isomorphic-fetch";
import remoteConfig from "store/remoteConfig";
import {handle, getDefaultHeaders} from "./serviceHandler";

export const VehicleReviewService = {
  loadUpdateForm: function (id) {
    return handle(fetch(`${remoteConfig.remote}/api/vehicle-review/${id}`, {
      method: "GET",
      headers: getDefaultHeaders()
    }));
  },
  createItem: (vehicleId, data) => {
    return handle(fetch(`${remoteConfig.remote}/api/vehicle/${vehicleId}/vehicle-review`, {
      method: "POST",
      headers: getDefaultHeaders(),
      body: JSON.stringify(data)
    }));
  },
  updateItem: (vehicleId, id, data) => {
    return handle(fetch(`${remoteConfig.remote}/api/vehicle/${vehicleId}/vehicle-review/${id}`, {
      method: "PUT",
      headers: getDefaultHeaders(),
      body: JSON.stringify(data)
    }));
  },
  deleteItem: function (id) {
    return handle(fetch(`${remoteConfig.remote}/api/vehicle-review/${id}`, {
      method: "DELETE",
      headers: getDefaultHeaders()
    }));
  },
  getList: function(){
    return handle(fetch(`${remoteConfig.remote}/api/vehicle-reviews`, {
      method: "GET",
      headers: getDefaultHeaders()
    }));
  },
  getVehicleReviews: function (vehicleId) {
    return handle(fetch(`${remoteConfig.remote}/api/vehicle-reviews/${vehicleId}`, {
      method: "GET",
      headers: getDefaultHeaders()
    }));
  }

};
