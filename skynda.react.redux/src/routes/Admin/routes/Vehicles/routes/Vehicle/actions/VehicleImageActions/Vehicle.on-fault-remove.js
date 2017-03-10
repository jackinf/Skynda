/**
 * Created by zekar on 3/8/2017.
 */
import {VEHICLE_FORM_KEY} from "../../../../constants/Vehicles.constant";
import {arrayRemove} from 'redux-form';
import {imageUtil} from "utils/allUtils";

export default function onFaultRemove(e, index) {
  return (dispatch) => {
    dispatch(arrayRemove(VEHICLE_FORM_KEY, "faults", index));
    // TODO: use arrayPop and push the item into filesToDelete {blobName, containerName}
  }
}
