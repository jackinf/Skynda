/**
 * Created by zekar on 3/8/2017.
 */
import {VEHICLE_FORM_KEY} from "../../../../constants/Vehicles.constant";
import {arrayRemove} from 'redux-form';
import {imageUtil} from "utils/allUtils";

export default function onImageFileRemove(e, index) {
  return (dispatch) => {
    // TODO: use arrayPop and push the item into filesToDelete {blobName, containerName}
    dispatch(arrayRemove(VEHICLE_FORM_KEY, "images", index));
  }
}
