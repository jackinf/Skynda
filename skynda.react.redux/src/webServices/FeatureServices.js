import fetch from "isomorphic-fetch";
import remoteConfig from "store/remoteConfig";
import {handle, getDefaultHeaders} from "./serviceHandler";

export const FeatureService = {
  getAdminSelectList: function () {
    return handle(fetch(`${remoteConfig.remote}/api/feature/admin-select`, {
      method: "GET",
      headers: getDefaultHeaders()
    }));
  },
  getFeatures: function () {
    return handle(fetch(`${remoteConfig.remote}/api/features`, {
      method: "GET",
      headers: getDefaultHeaders()
    }))
  },
  deleteFeature: function (id) {
    return handle(fetch(`${remoteConfig.remote}/api/feature/${id}`, {
      method: "DELETE",
      headers: getDefaultHeaders()
    }));
  },
  createFeatureAsync: function (data) {
    return handle(fetch(`${remoteConfig.remote}/api/feature`, {
      method: "POST",
      headers: getDefaultHeaders(),
      body: JSON.stringify(data)
    }))
  },
  updateFeatureAsync: function (data) {
    return handle(fetch(`${remoteConfig.remote}/api/feature/${data.id}`, {
      method: "PUT",
      headers: getDefaultHeaders(),
      body: JSON.stringify(data)
    }))
  },
  loadUpdateForm: function (id) {
    return handle(fetch(`${remoteConfig.remote}/api/feature/${id}`, {
      method: "GET",
      headers: getDefaultHeaders()
    }));
  }
};
