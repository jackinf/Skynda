import fetch from "isomorphic-fetch";
import remoteConfig from "store/remoteConfig";
import {handle, getDefaultHeaders} from "./serviceHandler";

export const ImageService = {
  getImagesInContainer: function (containerName) {
    return handle(fetch(`${remoteConfig.remote}/api/image/list?containerName=${containerName}`, {
      method: "GET",
      headers: getDefaultHeaders()
    }));
  }

};
