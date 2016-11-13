/**
 * Created by jevgenir on 11/2/2016.
 */

// import setVehicleData from "./Car.setVehicleData.action";
import {FORMS} from "../../constants/Vehicle.constant";
import {arrayPush, arrayRemove, change} from "redux-form";
import {imageUtil} from "../../../../../../utils/allUtils";

export function onMainImageUpload(e) {
  return (dispatch) => {
    imageUtil.imageFileToBase64(e.target.files[0], (base64File) => {
      dispatch(change(FORMS.VEHICLE_FORM, "mainImageContainer.base64File", base64File));
    });
  }
}

export function onMainImageRemove(e) {
  return (dispatch) => {
    dispatch(change(FORMS.VEHICLE_FORM, "mainImageContainer.base64File", null));
    // TODO: use arrayPop and push the item into filesToDelete {blobName, containerName}
  }
}

export function onImageFileUpload(acceptedFiles) {
  return (dispatch, getState) => {
    acceptedFiles.forEach(file => {
      imageUtil.imageFileToBase64(file, (base64File) => {
        dispatch(arrayPush(FORMS.VEHICLE_FORM, `images`, {imageContainer: {base64File}}));
      });
    });
  }
}

export function onImageFileRemove(e, index) {
  return (dispatch) => {
    // TODO: use arrayPop and push the item into filesToDelete {blobName, containerName}
    dispatch(arrayRemove(FORMS.VEHICLE_FORM, "images", index));
  }
}

export function onFaultFileUpload(e, index) {
  return (dispatch) => {
    imageUtil.imageFileToBase64(e.target.files[0], (base64File) => {
      dispatch(change(FORMS.VEHICLE_FORM, `faults[${index}].imageContainer.base64File`, base64File));
    });
  }
}

export function onFaultRemove(e, index) {
  return (dispatch) => {
    dispatch(arrayRemove(FORMS.VEHICLE_FORM, "faults", index));
    // TODO: use arrayPop and push the item into filesToDelete {blobName, containerName}
  }
}
