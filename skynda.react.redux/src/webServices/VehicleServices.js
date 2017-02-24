import fetch from "isomorphic-fetch";
import remoteConfig from "store/remoteConfig";
import {handle, getDefaultHeaders} from "./serviceHandler";

export const VehicleService = {
  deleteItem: function (id) {
    return handle(fetch(`${remoteConfig.remote}/api/vehicle/${id}`, {
      method: "DELETE",
      credentials: "include",
      headers: getDefaultHeaders()
    }));
  },
  getList: function () {
    return handle(fetch(`${remoteConfig.remote}/api/vehicles`, {
      method: "GET",
      credentials: "include",
      headers: getDefaultHeaders()
    }))
  },
  fetchItem: function (id) {
    return handle(fetch(`${remoteConfig.remote}/api/vehicle/${id}`, {
      method: "GET",
      credentials: "include",
      headers: getDefaultHeaders()
    }));
  },
  getDataAsync: function (id) {
    return handle(fetch(`${remoteConfig.remote}/api/vehicle/${id}/detailed`, {
      method: "GET",
      credentials: "include",
      headers: getDefaultHeaders()
    }));
  },
  search: function (searchValues) {
    return handle(fetch(`${remoteConfig.remote}/api/vehicle/search`, {
      method: "POST",
      credentials: "include",
      headers: getDefaultHeaders(),
      body: JSON.stringify(searchValues)
    }));
  },
  createItem: function (data) {
    return handle(fetch(`${remoteConfig.remote}/api/vehicle`, {
      method: "POST",
      credentials: "include",
      headers: getDefaultHeaders(),
      body: JSON.stringify(data)
    }));
  },
  updateItem: function (data) {
    return handle(fetch(`${remoteConfig.remote}/api/vehicle/${data.id}`, {
      method: "PUT",
      credentials: "include",
      headers: getDefaultHeaders(),
      body: JSON.stringify(data)
    }));
  }
};
