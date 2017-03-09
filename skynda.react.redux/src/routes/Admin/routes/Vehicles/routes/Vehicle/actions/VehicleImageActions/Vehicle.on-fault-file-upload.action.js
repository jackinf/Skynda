/**
 * Created by zekar on 3/8/2017.
 */
import {FORMS} from "../../../../constants/Vehicles.constant";
import {change} from 'redux-form';
import {imageUtil} from "utils/allUtils";

export default function onFaultFileUpload(e, index) {
  return (dispatch) => {
    imageUtil.imageFileToBase64(e.target.files[0], (base64File) => {
      dispatch(change(FORMS.VEHICLE_FORM, `faults[${index}].image.base64File`, base64File));
    });
  }
}
