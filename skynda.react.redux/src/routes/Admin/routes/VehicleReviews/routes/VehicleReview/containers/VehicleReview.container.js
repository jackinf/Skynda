import {connect} from "react-redux";
import {reduxForm} from 'redux-form';
import {
  load,
  submit as onHandleSubmit,
} from "../actions";
import ViewComponent from "../components/VehicleReview.component";
import {FORMS, REDUCER_KEYS} from "../../../constants/VehicleReview.constant";
import getVehiclesList from "../../../../Vehicles/actions/Vehicles.get-list.actions";

// Decorate the form component
const DecoratedViewComponent = reduxForm({
  form: FORMS.VEHICLE_FORM_REVIEW
})(ViewComponent);

const mapDispatchToProps = {
  load,
  getVehiclesList,
  onHandleSubmit
};

const mapStateToProps = (state, ownProps) => {
  return {
    isFetching: state[REDUCER_KEYS.VEHICLE_REVIEW_DATA].isFetching,
    initialValues: state[REDUCER_KEYS.VEHICLE_REVIEW_DATA].data,
    vehicles: state[REDUCER_KEYS.VEHICLES_REVIEW],

    onSubmitCustom: ownProps.onSubmitCustom
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DecoratedViewComponent);
