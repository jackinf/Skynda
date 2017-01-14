/**
 * Created by jevgenir on 1/14/2017.
 */
import {connect} from "react-redux";
import {cropImageAsync} from "../reducers/CropTool.reducer";
import Component from "../components/CropTool.component";
const mapStateToProps = (state) => ({
  initialValues: {} // redux-form starting values
});
const mapDispatchToProps = {cropImageAsync};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
