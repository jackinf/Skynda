/**
 * Created by zekar on 3/8/2017.
 */
import {VEHICLE_FORM_KEY} from "../../../../constants/Vehicles.constant";
import {change} from 'redux-form';
import {imageUtil} from "utils/allUtils";

export default function onMainImageUpload(e) {
  return (dispatch) => {
    imageUtil.imageFileToBase64(e.target.files[0], (base64File) => {
      dispatch(change(VEHICLE_FORM_KEY, "mainImage.base64File", base64File));
    });
  }
}
