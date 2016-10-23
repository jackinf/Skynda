/**
 * Created by jevgenir on 10/21/2016.
 */
import {connect} from "react-redux";
import {reduxForm} from 'redux-form';
import {loadUpdateForm, submitCarForm, clear} from '../actions/Car.actions';
import {setFormMode} from "../reducers/SetFormMode.reducer";
import CarComponent from "../components/Car.component";
import {CAR_UPDATE_FORM} from "./../constants/Car.constant";

// Decorate the form component
const DecoratedCarComponent = reduxForm({
  form: CAR_UPDATE_FORM
})(CarComponent);

const mapDispatchToProps = {
  load: loadUpdateForm,
  clear,
  submitCarForm,
  setFormMode
};

const mapStateToProps = (state) => ({
  initialValues: state.initialValues.data,
  formMode1: state.formMode1
});

export default connect(mapStateToProps, mapDispatchToProps)(DecoratedCarComponent);
