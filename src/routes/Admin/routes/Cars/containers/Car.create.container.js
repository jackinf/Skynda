/**
 * Created by zekar on 10/23/2016.
 */
import {connect} from "react-redux";
import {reduxForm} from 'redux-form';
import {loadCreateForm, submitCarForm, clear} from '../actions/Car.actions';
import {setFormMode} from "../reducers/SetFormMode.reducer";
import CarComponent from "../components/Car.component";
import {CAR_CREATE_FORM} from "./../constants/Car.constant";

// Decorate the form component
const DecoratedCarComponent = reduxForm({
  form: CAR_CREATE_FORM // a unique name for this form
})(CarComponent);

const mapDispatchToProps = {
  load: loadCreateForm,
  clear,
  submitCarForm,
  setFormMode
};

const mapStateToProps = (state) => ({
  initialValues: state.initialValues.data,
  formMode1: state.formMode1
});

export default connect(mapStateToProps, mapDispatchToProps)(DecoratedCarComponent);
