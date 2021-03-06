import fetch from "isomorphic-fetch";
import remoteConfig from "store/remoteConfig";
import {handle, getDefaultHeaders} from "../utils/serviceHandler";

export const BlobService = {
  getBlobsInContainer: function (containerName) {
    return handle(fetch(`${remoteConfig.remote}/api/blob/list?containerName=${containerName}`, {
      method: "GET",
      headers: getDefaultHeaders()
    }));
  }
};
