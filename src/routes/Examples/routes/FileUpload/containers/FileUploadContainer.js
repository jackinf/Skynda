import {connect} from "react-redux";
import {reduxForm} from 'redux-form';
import {onChangeFiles} from '../actions';
import FileUploadComponent from "../components/FileUploadComponent";

// Decorate the form component
const DecoratedFileUploadComponent = reduxForm({
  form: 'fileUploadExampleForm' // a unique name for this form
})(FileUploadComponent);

const mapDispatchToProps = {
  onChangeFiles
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(DecoratedFileUploadComponent);
