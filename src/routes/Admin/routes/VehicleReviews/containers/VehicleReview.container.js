/**
 * Created by zekar on 10/23/2016.
 */
import {connect} from "react-redux";
import {reduxForm} from 'redux-form';
import {
  clear,
  load,
  formSubmit,
  fillWithFakeData
} from "../actions";
import ViewComponent from "../components/VehicleReview.component";
import {FORMS, REDUCER_KEYS} from "../constants/VehicleReview.constant";
import {setFormMode} from "../reducers/SetFormMode.reducer";
import getVehiclesList from "../../Vehicles/actions/Vehicles/Vehicles.getList.action";

// Decorate the form component
const DecoratedViewComponent = reduxForm({
  form: FORMS.VEHICLE_FORM
})(ViewComponent);

const mapDispatchToProps = {
  load,
  clear,
  getVehiclesList,
  formSubmit,
  setFormMode,
  fillWithFakeData
};

const mapStateToProps = (state) => {
  return {
    isFetching: state[REDUCER_KEYS.VEHICLE_DATA].isFetching,
    initialValues: state[REDUCER_KEYS.VEHICLE_DATA].data,
    formMode1: state[REDUCER_KEYS.FORM_MODE],
    vehicles: state["vehicles"]
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DecoratedViewComponent);
