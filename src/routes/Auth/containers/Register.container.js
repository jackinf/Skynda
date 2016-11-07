/**
 * Created by jevgenir on 11/7/2016.
 */
import {connect} from "react-redux";
import {reduxForm} from "redux-form";
import RegisterComponent from "../components/Register.component";
import {submitRegister} from "../actions";

// Decorate the form component
const ReduxForm = reduxForm({
  form: 'registerForm' // a unique name for this form
})(RegisterComponent);

const mapDispatchToProps = {
  submitRegister
};
const mapStateToProps = (state) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(ReduxForm);
