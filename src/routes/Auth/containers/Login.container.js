/**
 * Created by jevgenir on 11/7/2016.
 */
import {connect} from "react-redux";
import {reduxForm} from "redux-form";
import LoginComponent from "../components/Login.component";
import {submitLogin} from "./../actions";

// Decorate the form component
const ReduxForm = reduxForm({
  form: 'loginForm' // a unique name for this form
})(LoginComponent);

const mapDispatchToProps = {
  submitLogin
};
const mapStateToProps = (state) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(ReduxForm);
