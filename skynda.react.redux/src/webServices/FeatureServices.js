import fetch from "isomorphic-fetch";
import remoteConfig from "store/remoteConfig";
import {handle, getDefaultHeaders} from "./serviceHandler";

export const FeatureService = {
  getAdminSelectList: function () {
    return handle(fetch(`${remoteConfig.remote}/api/feature/admin-select`, {
      method: "GET",
      credentials: "include",
      headers: getDefaultHeaders()
    }));
  },
  getFeatures: function () {
    return handle(fetch(`${remoteConfig.remote}/api/features`, {
      method: "GET",
      credentials: "include",
      headers: getDefaultHeaders()
    }))
  },
  deleteFeature: function (id) {
    return handle(fetch(`${remoteConfig.remote}/api/feature/${id}`, {
      method: "DELETE",
      credentials: "include",
      headers: getDefaultHeaders()
    }));
  },
  createFeatureAsync: function (data) {
    return handle(fetch(`${remoteConfig.remote}/api/feature`, {
      method: "POST",
      credentials: "include",
      headers: getDefaultHeaders(),
      body: JSON.stringify(data)
    }))
  },
  updateFeatureAsync: function (data) {
    return handle(fetch(`${remoteConfig.remote}/api/feature/${data.id}`, {
      method: "PUT",
      credentials: "include",
      headers: getDefaultHeaders(),
      body: JSON.stringify(data)
    }))
  },
  loadUpdateForm: function (id) {
    return handle(fetch(`${remoteConfig.remote}/api/feature/${id}`, {
      method: "GET",
      credentials: "include",
      headers: getDefaultHeaders()
    }));
  }
};
