import {imageUtil} from "utils/allUtils";
import {FORMS} from "../constants/VehicleReport.constant";
import {arrayRemove, change} from 'redux-form';

export function onFaultFileUpload(e, index) {
  return (dispatch) => {
    console.log("onFaultFileUpload", e + " " + index);
    imageUtil.imageFileToBase64(e.target.files[0], (base64File) => {
      dispatch(change(FORMS.VEHICLE_FORM, `faults[${index}].image.base64File`, base64File));
    });
  }
}

export function onFaultRemove(e, index) {
  return (dispatch) => {
    dispatch(arrayRemove(FORMS.VEHICLE_FORM, "faults", index));
    // TODO: use arrayPop and push the item into filesToDelete {blobName, containerName}
  }
}
