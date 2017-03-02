import fetch from "isomorphic-fetch";
import remoteConfig from "store/remoteConfig";
import {handle, getDefaultHeaders} from "./serviceHandler";

export const VehicleReportService = {
  loadUpdateForm: function (id) {
    return handle(fetch(`${remoteConfig.remote}/api/vehicle-report/${id}`, {
      method: "GET",
      headers: getDefaultHeaders()
    }));
  },
  createVehicleAsync: function (data) {
    return handle(fetch(`${remoteConfig.remote}/api/vehicle-report`, {
      method: "POST",
      headers: getDefaultHeaders(),
      body: JSON.stringify(data)
    }));
  },
  updateVehicleAsync: function (data) {
    return handle(fetch(`${remoteConfig.remote}/api/vehicle-report/${data.id}`, {
      method: "PUT",
      headers: getDefaultHeaders(),
      body: JSON.stringify(data)
    }));
  },
  deleteItem: function (id) {
    return handle(fetch(`${remoteConfig.remote}/api/vehicle-report/${id}`, {
      method: "DELETE",
      headers: getDefaultHeaders()
    }));
  },
  getList: function () {
    return handle(fetch(`${remoteConfig.remote}/api/vehicle-reports`, {
      method: "GET",
      headers: getDefaultHeaders()
    }));
  },
  getVehicleReports: function (vehicleId) {
    return handle(fetch(`${remoteConfig.remote}/api/vehicle-reports/${vehicleId}`, {
      method: "GET",
      headers: getDefaultHeaders()
    }));
  }
};
