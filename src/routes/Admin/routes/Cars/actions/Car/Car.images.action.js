/**
 * Created by jevgenir on 11/2/2016.
 */

// import setCarData from "./Car.setCarData.action";
import {FORMS} from "../../constants/Car.constant";
import {arrayPush, arrayRemove, change} from "redux-form";
import {imageUtil} from "../../../../../../utils/allUtils";

export function onMainImageUpload(e) {
  return (dispatch) => {
    imageUtil.imageFileToBase64(e.target.files[0], (base64File) => {
      // // Instead of using url we can temporarily use base64
      dispatch(change(FORMS.CAR_FORM, "mainImageUrl", base64File));
      dispatch(change(FORMS.CAR_FORM, "filesToUpload.mainImageFile", base64File));
    });
  }
}

export function onMainImageRemove(e) {
  return (dispatch) => {
    dispatch(change(FORMS.CAR_FORM, "mainImageUrl", null)); // TODO: Restore previous image?
    dispatch(change(FORMS.CAR_FORM, "filesToUpload.mainImageFile", null));
    // TODO: use arrayPop and push the item into filesToDelete {blobName, containerName}
  }
}

export function onImageFileUpload(acceptedFiles) {
  return (dispatch) => {
    acceptedFiles.forEach(file => {
      imageUtil.imageFileToBase64(file, (base64File) => {
        dispatch(arrayPush(FORMS.CAR_FORM, "filesToUpload.imageFiles", base64File));
        // dispatch(arrayPush(FORMS.CAR_FORM, "images", base64File));
      });
    });
  }
}

export function onImageFileRemove(e, index) {
  return (dispatch) => {
    // TODO: use arrayPop and push the item into filesToDelete {blobName, containerName}
    dispatch(arrayRemove(FORMS.CAR_FORM, "images", index));
  }
}

export function onFaultFileUpload(e, index) {
  return (dispatch) => {
    imageUtil.imageFileToBase64(e.target.files[0], (base64File) => {
      // // Instead of using url we can temporarily use base64
      // dispatch(arrayPush(FORMS.CAR_FORM, "filesToUpload.faultsFiles", {id: index, base64File}));
      dispatch(change(FORMS.CAR_FORM, `faults[${index}].base64File`, base64File));
    });
  }
}

export function onFaultRemove(e, index) {
  return (dispatch) => {
    // dispatch(arrayRemove(FORMS.CAR_FORM, "filesToUpload.faultsFiles", index)); // TODO: Get correct index
    dispatch(arrayRemove(FORMS.CAR_FORM, "faults", index));
    // TODO: use arrayPop and push the item into filesToDelete {blobName, containerName}
  }
}
