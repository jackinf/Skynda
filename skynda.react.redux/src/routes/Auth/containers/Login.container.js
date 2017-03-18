/**
 * Created by jevgenir on 11/7/2016.
 */
import {connect} from "react-redux";
import {reduxForm} from "redux-form";
import LoginComponent from "../components/Login.component";
import {submitLogin} from "./../actions";
import {LOGIN_FORM} from "../constants/Login.constants";
import {REDUCER_KEY__AUTH} from "../constants/Auth.constants";

const ReduxForm = reduxForm({form: LOGIN_FORM})(LoginComponent);

const mapStateToProps = (state) => ({
  isFetching: state[REDUCER_KEY__AUTH].isFetching,
  isAuthenticated: state[REDUCER_KEY__AUTH].isAuthenticated,
  errorMessage: state[REDUCER_KEY__AUTH].errorMessage
});
const dispatchStateToProps = {
  submitLogin
};

export default connect(mapStateToProps, dispatchStateToProps)(ReduxForm);
