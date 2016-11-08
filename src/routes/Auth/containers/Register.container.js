/**
 * Created by jevgenir on 11/7/2016.
 */
import {connect} from "react-redux";
import {reduxForm} from "redux-form";
import RegisterComponent from "../components/Register.component";
import {submitRegister} from "../actions";
import {REGISTER_FORM} from "../constants";

const ReduxForm = reduxForm({form: REGISTER_FORM})(RegisterComponent);

export default connect((state) => ({auth: state.auth}), {submitRegister})(ReduxForm);
