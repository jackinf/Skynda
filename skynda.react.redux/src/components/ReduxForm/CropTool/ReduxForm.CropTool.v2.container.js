/**
 * Created by jevgenir on 1/14/2017.
 */

import {connect} from "react-redux";
import Component from "./ReduxForm.CropTool.v2.component.jsx";
import {
  onImageUpload,
  onCropChange,
  onCropDone,
  onImageRemove
} from "./ReduxForm.CropTool.actions";

const mapStateToProps = (state, ownProps) => ({
  reduxFormName: ownProps.reduxFormName
});
const mapDispatchToProps = {
  onImageUpload,
  onCropChange,
  onCropDone,
  onImageRemove
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
