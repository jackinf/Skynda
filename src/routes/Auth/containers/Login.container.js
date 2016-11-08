/**
 * Created by jevgenir on 11/7/2016.
 */
import {connect} from "react-redux";
import {reduxForm} from "redux-form";
import LoginComponent from "../components/Login.component";
import {submitLogin} from "./../actions";
import {LOGIN_FORM} from "../constants";

const ReduxForm = reduxForm({form: LOGIN_FORM})(LoginComponent);

export default connect((state) => ({auth: state.auth}), {submitLogin})(ReduxForm);
