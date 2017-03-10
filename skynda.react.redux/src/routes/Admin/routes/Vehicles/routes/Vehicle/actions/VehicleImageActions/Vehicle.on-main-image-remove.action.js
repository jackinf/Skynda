/**
 * Created by zekar on 3/8/2017.
 */
import {VEHICLE_FORM_KEY} from "../../../../constants/Vehicles.constant";
import {change} from 'redux-form';
import {imageUtil} from "utils/allUtils";

export default function onMainImageRemove(e) {
  return (dispatch) => {
    dispatch(change(VEHICLE_FORM_KEY, "mainImage.base64File", null));
    // TODO: use arrayPop and push the item into filesToDelete {blobName, containerName}
  }
}
