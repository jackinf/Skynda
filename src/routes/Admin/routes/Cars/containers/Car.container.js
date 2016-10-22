/**
 * Created by jevgenir on 10/21/2016.
 */
import {connect} from "react-redux";
import {reduxForm} from 'redux-form';
import {getCarAsync, submitCarForm} from '../actions/Car.actions';
import {setFormMode} from "../reducers/SetFormMode.reducer";
import CarComponent from "../components/Car.component";
import {CAR_CREATE_FORM} from "./../constants/Car.constant";

// Decorate the form component
const DecoratedCarComponent = reduxForm({
  form: CAR_CREATE_FORM // a unique name for this form
})(CarComponent);

const mapDispatchToProps = {
  load: getCarAsync,
  submitCarForm,
  setFormMode
};

const mapStateToProps = (state) => ({
  initialValues: state.initialValues.data,
  formMode: state.formMode
});

export default connect(mapStateToProps, mapDispatchToProps)(DecoratedCarComponent);
