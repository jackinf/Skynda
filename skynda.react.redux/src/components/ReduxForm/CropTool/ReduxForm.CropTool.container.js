/**
 * Created by jevgenir on 1/14/2017.
 */

import {connect} from "react-redux";
import {change} from "redux-form";
import imageUtil from "../../../utils/allUtils/imageUtil";
import Component from "./ReduxForm.CropTool.component";
import {BASE64FILE, CROP_INFO} from "./ReduxForm.CropTool.constants";

function resizeCrop(image, cb) {
  const cropInfo = image.cropInfo;
  const canvas = document.createElement("canvas");
  canvas.width = cropInfo.width;
  canvas.height = cropInfo.height;
  const context =  canvas.getContext('2d');
  const imageObj = new Image();
  imageObj.onload = function() {
    context.drawImage(imageObj, -cropInfo.x, -cropInfo.y);
    const newBase64 = canvas.toDataURL('image/jpg', 90);
    cb(newBase64);
  };
  imageObj.src = image.base64File;
}

const mapStateToProps = (state, ownProps) => ({
  reduxFormName: ownProps.reduxFormName
});
const mapDispatchToProps = {
  onImageUpload: (e, name, reduxFormName) => (dispatch) => {
    imageUtil.imageFileToBase64(e.target.files[0], (base64File) => {
      console.info("onImageUpload", reduxFormName, `${name}.${BASE64FILE}`);
      dispatch(change(reduxFormName, `${name}.${BASE64FILE}`, base64File));
    });
  },

  onImageRemove: (e, name, reduxFormName) => (dispatch) => {
    dispatch(change(reduxFormName, `${name}.${BASE64FILE}`, null));
  },

  onCropChange: (crop, pixelCrop, name, reduxFormName) => (dispatch) => {
    console.log("onCropChange", crop, pixelCrop);
    dispatch(change(reduxFormName, `${name}.${CROP_INFO}`, {
      width: pixelCrop.width,
      height: pixelCrop.height,
      x: pixelCrop.x,
      y: pixelCrop.y,
      crop: false
    }));
  },

  onCropDone: (name, reduxFormName, file) => (dispatch, getState) => {
    const state = getState();
    const image = state.form[reduxFormName] ? state.form[reduxFormName].values.image : null;
    resizeCrop(image, (newBase64) => {
      // dispatch(change(reduxFormName, `${name}.${CROP_INFO}.crop`, true));
      dispatch(change(reduxFormName, `${name}.${BASE64FILE}`, newBase64));
    });
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
