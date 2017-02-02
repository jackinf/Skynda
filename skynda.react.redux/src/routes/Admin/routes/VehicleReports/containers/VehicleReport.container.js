import {connect} from "react-redux";
import {reduxForm} from 'redux-form';
import {
  clear,
  load,
  formSubmit,
  onFormSubmitSuccess,
  onFormSubmitError,
  onFaultFileUpload,
  onFaultRemove
} from "../actions";
import ViewComponent from "../components/VehicleReport.component";
import {FORMS, REDUCER_KEYS} from "../constants/VehicleReport.constant";
import {setFormMode} from "../reducers/SetFormMode.reducer";
import {getList as getVehiclesList} from "../../Vehicles/actions/Vehicles";

// Decorate the form component
const DecoratedViewComponent = reduxForm({
  form: FORMS.VEHICLE_FORM
})(ViewComponent);

const mapDispatchToProps = {
  load,
  clear,
  getVehiclesList,
  formSubmit,
  onFormSubmitSuccess,
  onFormSubmitError,
  setFormMode,
  onFaultFileUpload,
  onFaultRemove,
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
