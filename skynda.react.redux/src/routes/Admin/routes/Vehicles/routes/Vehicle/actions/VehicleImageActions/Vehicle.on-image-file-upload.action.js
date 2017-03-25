/**
 * Created by zekar on 3/8/2017.
 */
import {VEHICLE_FORM_KEY} from "../../../../constants/Vehicles.constant";
import {arrayUnshift} from 'redux-form';
import {imageUtil} from "utils/allUtils";
import _ from "underscore";

// Ideas to crop image in client
// 1. https://gist.github.com/DominicTobias/b1fb501349893922ec7f
// 2. https://gist.github.com/DominicTobias/6aa43d03bc12232ef723

export default function onImageFileUpload(acceptedFiles) {
  return (dispatch, getState) => {
    let error = {};
    acceptedFiles.forEach(file => {
      error = imageUtil.imageFileToBase64(file, (base64File) => {
        dispatch(arrayUnshift(VEHICLE_FORM_KEY, `images`, {image: {base64File}}));
      });

      if(!_.isEmpty(error)){
        return error;
      }

    });

    return error;
  }
}
