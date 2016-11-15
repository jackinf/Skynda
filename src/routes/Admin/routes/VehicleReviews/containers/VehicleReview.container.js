/**
 * Created by zekar on 10/23/2016.
 */
import {connect} from "react-redux";
import {reduxForm} from 'redux-form';
import {
  clear,
  load,
  setFormMode,
  submitVehicleForm,
  fillWithFakeData
} from "../actions";
import ViewComponent from "../components/VehicleReview.component";
import {FORMS, REDUCER_KEYS} from "../constants/VehicleReview.constant";

// Decorate the form component
const DecoratedViewComponent = reduxForm({
  form: FORMS.VEHICLE_FORM
})(ViewComponent);

const mapDispatchToProps = {
  load,
  clear,
  submitVehicleForm,
  setFormMode,
  fillWithFakeData
};

const mapStateToProps = (state) => {
  return {
    isFetching: state[REDUCER_KEYS.VEHICLE_DATA].isFetching,
    initialValues: state[REDUCER_KEYS.VEHICLE_DATA].data,
    formMode1: state[REDUCER_KEYS.FORM_MODE]
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DecoratedViewComponent);
