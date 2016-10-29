import {connect} from "react-redux";
import {reduxForm} from 'redux-form';
import {submitMyForm, onChangeFiles} from '../actions';
import FileUploadComponent from "../components/FileUploadComponent";

// Decorate the form component
const DecoratedFileUploadComponent = reduxForm({
  form: 'fileUploadExampleForm' // a unique name for this form
})(FileUploadComponent);

const mapDispatchToProps = {
  submitMyForm,
  onChangeFiles
};

const mapStateToProps = (state) => ({
  testFile: state.setTestFile
});

export default connect(mapStateToProps, mapDispatchToProps)(DecoratedFileUploadComponent);
