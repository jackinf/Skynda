import fetch from "isomorphic-fetch";
import remoteConfig from "store/remoteConfig";
import {handle, getDefaultHeaders} from "../utils/serviceHandler";

/*
 * VehicleModelController*/
export const VehicleModelService = {
  deleteItem: function (id) {
    return handle(fetch(`${remoteConfig.remote}/api/vehicle-model/${id}`, {
      method: "DELETE",
      headers: getDefaultHeaders()
    }));
  },
  getList: function () {
    return handle(fetch(`${remoteConfig.remote}/api/vehicle-models`, {
      method: "GET",
      headers: getDefaultHeaders()
    }));
  },
  createItem: (item) => {
    return handle(fetch(`${remoteConfig.remote}/api/vehicle-model`, {
      method: "POST",
      headers: getDefaultHeaders(),
      body: JSON.stringify(item)
    }));
  },
  updateItem: (item) => {
    return handle(fetch(`${remoteConfig.remote}/api/vehicle-model/${item.id}`, {
      method: "PUT",
      headers: getDefaultHeaders(),
      body: JSON.stringify(item)
    }))
  },
  fetchItem: function (id) {
    return handle(fetch(`${remoteConfig.remote}/api/vehicle-model/${id}`, {
      method: "GET",
      headers: getDefaultHeaders()
    }));
  },
  getModelsList: function (manufacturerIds) {
    return handle(fetch(`${remoteConfig.remote}/api/vehicle-model/search${manufacturerIds}`, {
      method: "GET",
      headers: getDefaultHeaders()
    }));
  }
};
