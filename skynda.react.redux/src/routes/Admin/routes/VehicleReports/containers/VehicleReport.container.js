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
} from "../reducers";
import ViewComponent from "../components/VehicleReport.component";
import {FORMS, REDUCER_KEYS} from "../constants/VehicleReport.constant";
import {setFormMode} from "../actions";
import {getList as getVehiclesList} from "../../Vehicles/actions";

// Decorate the form component
const DecoratedViewComponent = reduxForm({
  form: FORMS.VEHICLE_FORM_REPORT
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
    isFetching: state[REDUCER_KEYS.VEHICLE_REPORT_DATA].isFetching,
    initialValues: state[REDUCER_KEYS.VEHICLE_REPORT_DATA].data,
    formModeReport: state[REDUCER_KEYS.FORM_MODE_VEHICLE_REPORT],
    vehicles: state[REDUCER_KEYS.VEHICLES]
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DecoratedViewComponent);
