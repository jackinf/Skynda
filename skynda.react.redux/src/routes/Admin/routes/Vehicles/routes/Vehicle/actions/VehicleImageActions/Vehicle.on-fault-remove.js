/**
 * Created by zekar on 3/8/2017.
 */
import {FORMS} from "../../../../constants/Vehicles.constant";
import {arrayRemove} from 'redux-form';
import {imageUtil} from "utils/allUtils";

export default function onFaultRemove(e, index) {
  return (dispatch) => {
    dispatch(arrayRemove(FORMS.VEHICLE_FORM, "faults", index));
    // TODO: use arrayPop and push the item into filesToDelete {blobName, containerName}
  }
}
