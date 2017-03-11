/**
 * Created by jevgenir on 3/11/2017.
 */

import {imageUtil} from "utils/allUtils";
import {FORMS} from "../../constants/VehicleReport.constant";
import {arrayRemove} from 'redux-form';

export default function onFaultRemove(e, index) {
  return (dispatch) => {
    dispatch(arrayRemove(FORMS.VEHICLE_FORM_REPORT, `faults`, index));
    // TODO: use arrayPop and push the item into filesToDelete {blobName, containerName}
  }
}
