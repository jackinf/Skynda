import fetch from "isomorphic-fetch";
import remoteConfig from "store/remoteConfig";
import {handle, getDefaultHeaders} from "./serviceHandler";

export const VehicleService = {
  deleteItem: function (id) {
    return handle(fetch(`${remoteConfig.remote}/api/vehicle/${id}`, {
      method: "DELETE",
      mode: 'no-cors',
      headers: getDefaultHeaders()
    }));
  },
  getList: function () {
    return handle(fetch(`${remoteConfig.remote}/api/vehicles`, {
      method: "GET",
      mode: 'no-cors',
      headers: getDefaultHeaders()
    }))
  },
  fetchItem: function (id) {
    return handle(fetch(`${remoteConfig.remote}/api/vehicle/${id}`, {
      method: "GET",
      mode: 'no-cors',
      headers: getDefaultHeaders()
    }));
  },
  getDataAsync: function (id) {
    return handle(fetch(`${remoteConfig.remote}/api/vehicle/${id}/detailed`, {
      method: "GET",
      mode: 'no-cors',
      headers: getDefaultHeaders()
    }));
  },
  search: function (searchValues) {
    return handle(fetch(`${remoteConfig.remote}/api/vehicle/search`, {
      method: "POST",
      mode: 'no-cors',
      headers: getDefaultHeaders(),
      body: JSON.stringify(searchValues)
    }));
  },
  createItem: function (data) {
    return handle(fetch(`${remoteConfig.remote}/api/vehicle`, {
      method: "POST",
      mode: 'no-cors',
      headers: getDefaultHeaders(),
      body: JSON.stringify(data)
    }));
  },
  updateItem: function (data) {
    return handle(fetch(`${remoteConfig.remote}/api/vehicle/${data.id}`, {
      method: "PUT",
      mode: 'no-cors',
      headers: getDefaultHeaders(),
      body: JSON.stringify(data)
    }));
  }
};
