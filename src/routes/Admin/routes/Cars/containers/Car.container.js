/**
 * Created by zekar on 10/23/2016.
 */
import {connect} from "react-redux";
import {reduxForm} from 'redux-form';
import {load, submitCarForm, clear} from '../actions/Car.actions';
import {setFormMode} from "../reducers/SetFormMode.reducer";
import CarComponent from "../components/Car.component";
import {FORMS} from "./../constants/Car.constant";

// Decorate the form component
const DecoratedCarComponent = reduxForm({
  form: FORMS.CAR_FORM
})(CarComponent);

const mapDispatchToProps = {
  load,
  clear,
  submitCarForm,
  setFormMode
};

const mapStateToProps = (state) => ({
  isFetching: state.carData.isFetching,
  initialValues: state.carData.data,
  formMode1: state.formMode1
});

export default connect(mapStateToProps, mapDispatchToProps)(DecoratedCarComponent);
