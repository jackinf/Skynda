import fetch from "isomorphic-fetch";
import remoteConfig from "store/remoteConfig";
import {handle, getDefaultHeaders} from "./serviceHandler";

/*
 * VehicleModelController*/
export const VehicleModelService = {
  deleteItem: function (id) {
    return handle(fetch(`${remoteConfig.remote}/api/vehicle-model/${id}`, {
      method: "DELETE",
      credentials: "include",
      headers: getDefaultHeaders()
    }));
  },
  getList: function () {
    return handle(fetch(`${remoteConfig.remote}/api/vehicle-models`, {
      method: "GET",
      credentials: "include",
      headers: getDefaultHeaders()
    }));
  },
  createItem: (item) => {
    return handle(fetch(`${remoteConfig.remote}/api/vehicle-model`, {
      method: "POST",
      credentials: "include",
      headers: getDefaultHeaders(),
      body: JSON.stringify(item)
    }));
  },
  updateItem: (item) => {
    return handle(fetch(`${remoteConfig.remote}/api/vehicle-model/${item.id}`, {
      method: "PUT",
      credentials: "include",
      headers: getDefaultHeaders(),
      body: JSON.stringify(item)
    }))
  },
  fetchItem: function (id) {
    return handle(fetch(`${remoteConfig.remote}/api/vehicle-model/${id}`, {
      method: "GET",
      credentials: "include",
      headers: getDefaultHeaders()
    }));
  },
  getModelsList: function (manufacturerIds) {
    return handle(fetch(`${remoteConfig.remote}/api/vehicle-models-by-manufacturers/${manufacturerIds}`, {
      method: "GET",
      credentials: "include",
      headers: getDefaultHeaders()
    }));
  }
};
