/**
 * Created by jevgenir on 3/11/2017.
 */

import {imageUtil} from "utils/allUtils";
import {FORMS} from "../../constants/VehicleReport.constant";
import {change} from 'redux-form';

export default function onFaultFileUpload(e, index) {
  return (dispatch) => {
    imageUtil.imageFileToBase64(e.target.files[0], (base64File) => {
      dispatch(change(FORMS.VEHICLE_FORM_REPORT, `faults[${index}].image.base64File`, base64File));
    });
  }
}
