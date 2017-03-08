import {connect} from "react-redux";
import {reduxForm} from 'redux-form';
import {
  clear,
  load,
  formSubmit,
  setFormMode
} from "../actions";
import ViewComponent from "../components/VehicleReview.component";
import {FORMS, REDUCER_KEYS} from "../constants/VehicleReview.constant";
import getVehiclesList from "../../Vehicles/actions/Vehicles.get-list.actions";

// Decorate the form component
const DecoratedViewComponent = reduxForm({
  form: FORMS.VEHICLE_FORM_REVIEW
})(ViewComponent);

const mapDispatchToProps = {
  load,
  clear,
  getVehiclesList,
  formSubmit,
  setFormMode
};

const mapStateToProps = (state) => {
  return {
    isFetching: state[REDUCER_KEYS.VEHICLE_REVIEW_DATA].isFetching,
    initialValues: state[REDUCER_KEYS.VEHICLE_REVIEW_DATA].data,
    formModeReview: state[REDUCER_KEYS.FORM_MODE_VEHICLE_REVIEW],
    vehicles: state[REDUCER_KEYS.VEHICLES_REVIEW]
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DecoratedViewComponent);
