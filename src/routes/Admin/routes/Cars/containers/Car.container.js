/**
 * Created by zekar on 10/23/2016.
 */
import {connect} from "react-redux";
import {reduxForm} from 'redux-form';
import {clear, load, setFormMode, submitCarForm, fillWithFakeData} from "../actions/Car";
import CarComponent from "../components/Car.component";
import {FORMS, REDUCER_KEYS} from "./../constants/Car.constant";

// Decorate the form component
const DecoratedCarComponent = reduxForm({
  form: FORMS.CAR_FORM
})(CarComponent);

const mapDispatchToProps = {
  load,
  clear,
  submitCarForm,
  setFormMode,
  fillWithFakeData
};

const mapStateToProps = (state) => ({
  isFetching: state[REDUCER_KEYS.CAR_DATA].isFetching,
  initialValues: state[REDUCER_KEYS.CAR_DATA].data,
  formMode1: state[REDUCER_KEYS.FORM_MODE]
});

export default connect(mapStateToProps, mapDispatchToProps)(DecoratedCarComponent);
