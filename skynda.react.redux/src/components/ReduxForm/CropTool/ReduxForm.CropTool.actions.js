/**
 * Created by jevgenir on 1/14/2017.
 */
import {change} from "redux-form";
import imageUtil from "../../../utils/allUtils/imageUtil";
import {BASE64FILE, CROP_INFO} from "./ReduxForm.CropTool.constants";

function resizeCrop(image, cb) {
  const cropInfo = image.cropInfo;
  const canvas = document.createElement("canvas");
  canvas.width = cropInfo.width;
  canvas.height = cropInfo.height;
  const context = canvas.getContext('2d');
  const imageObj = new Image();
  imageObj.onload = function () {
    context.drawImage(imageObj, -cropInfo.x, -cropInfo.y);
    const newBase64 = canvas.toDataURL('image/jpg', 90);
    cb(newBase64);
  };
  imageObj.src = image.base64File;
}

export const onImageUpload = (e, name, reduxFormName) => (dispatch) => {
  imageUtil.imageFileToBase64(e.target.files[0], (base64File) => {
    console.info("onImageUpload", reduxFormName, `${name}.${BASE64FILE}`);
    dispatch(change(reduxFormName, `${name}.${BASE64FILE}`, base64File));
  });
};

export const onImageRemove = (e, name, reduxFormName) => (dispatch) => {
  dispatch(change(reduxFormName, `${name}.${BASE64FILE}`, null));
};

export const onCropChange = (crop, pixelCrop, name, reduxFormName) => (dispatch) => {
  console.log("onCropChange", crop, pixelCrop);
  dispatch(change(reduxFormName, `${name}.${CROP_INFO}`, {
    width: pixelCrop.width,
    height: pixelCrop.height,
    x: pixelCrop.x,
    y: pixelCrop.y,
    crop: false
  }));
};

export const onCropDone = (name, reduxFormName, file) => (dispatch, getState) => {
  const state = getState();
  const image = state.form[reduxFormName] ? state.form[reduxFormName].values[name] : null;
  resizeCrop(image, (newBase64) => {
    dispatch(change(reduxFormName, `${name}.${BASE64FILE}`, newBase64));
  });
};
