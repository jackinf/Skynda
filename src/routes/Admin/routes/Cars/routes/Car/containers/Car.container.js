/**
 * Created by jevgenir on 10/21/2016.
 */
import {connect} from "react-redux";
import { reduxForm } from 'redux-form';
import {submitCarForm} from '../actions/CarWrite.actions';
import {getCarAsync} from '../actions/CarRead.actions';
import CarComponent from "../components/Car.component";

// Decorate the form component
const DecoratedCarComponent = reduxForm({
  form: 'reduxForm' // a unique name for this form
})(CarComponent);

const mapDispatchToProps = {
  submitCarForm,
  getCarAsync
};

const mapStateToProps = (state) => ({
  carData: state.carData
});

export default connect(mapStateToProps, mapDispatchToProps)(DecoratedCarComponent);
