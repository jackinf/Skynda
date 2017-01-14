/**
 * Created by jevgenir on 1/14/2017.
 */

import {connect} from "react-redux";
import {change} from "redux-form";
import imageUtil from "../../../utils/allUtils/imageUtil";
import Component from "./ReduxForm.CropTool.component";
import {BASE64FILE, CROP_INFO} from "./ReduxForm.CropTool.constants";

const mapStateToProps = (state, ownProps) => ({
  reduxFormName: ownProps.reduxFormName
});
const mapDispatchToProps = {
  onImageUpload: (e, name, reduxFormName) => (dispatch, getState) => {
    imageUtil.imageFileToBase64(e.target.files[0], (base64File) => {
      console.info("onImageUpload", reduxFormName, `${name}.${BASE64FILE}`);
      dispatch(change(reduxFormName, `${name}.${BASE64FILE}`, base64File));
    });
  },

  onImageRemove: (e, name, reduxFormName) => (dispatch, getState) => {
    dispatch(change(reduxFormName, `${name}.${BASE64FILE}`, null));
  },

  onCropComplete: (crop, pixelCrop, name, reduxFormName) => (dispatch, getState) => {
    console.log("onCropComplete", crop, pixelCrop);
    dispatch(change(reduxFormName, `${name}.${CROP_INFO}`, {
      width: crop.width,
      height: crop.height,
      x: crop.x,
      y: crop.y,
      crop: true
    }));
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
