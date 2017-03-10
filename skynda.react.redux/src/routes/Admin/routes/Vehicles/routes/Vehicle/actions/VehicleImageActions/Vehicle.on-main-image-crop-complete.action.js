/**
 * Created by zekar on 3/8/2017.
 */
import {VEHICLE_FORM_KEY} from "../../../../constants/Vehicles.constant";
import {change} from 'redux-form';
import {imageUtil} from "utils/allUtils";

export default function onMainImageCropComplete(crop, pixelCrop) {
  return (dispatch) => {
    dispatch(change(VEHICLE_FORM_KEY, "mainImage.cropInfo", {
      width: crop.width,
      height: crop.height,
      x: crop.x,
      y: crop.y,
      crop: false
    }));
  }
}
