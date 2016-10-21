import {connect} from "react-redux";
import {reduxForm} from "redux-form";
import {submitUploadForm} from "./CarManagement.actions";
import CarManagementComponent from "./CarManagement.component";
import {CAR_UPLOAD_FORM} from "./CarManagement.constants";

// Decorate the form component
const DecoratedReduxFormView = reduxForm({
  form: CAR_UPLOAD_FORM // a unique name for this form
})(CarManagementComponent);

const mapDispatchToProps = {
  submitUploadForm
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(DecoratedReduxFormView);
