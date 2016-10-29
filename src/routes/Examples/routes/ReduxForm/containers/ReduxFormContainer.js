import {connect} from "react-redux";
import { reduxForm } from 'redux-form';
import {submitMyForm} from '../actions/actions';
import ReduxFormView from "../components/ReduxFormView";

// Decorate the form component
const DecoratedReduxFormView = reduxForm({
  form: 'reduxForm' // a unique name for this form
})(ReduxFormView);

const mapDispatchToProps = {
  submitMyForm
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(DecoratedReduxFormView);
