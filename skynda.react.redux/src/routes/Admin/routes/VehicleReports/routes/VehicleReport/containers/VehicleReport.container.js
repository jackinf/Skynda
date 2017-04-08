import {connect} from "react-redux";
import {reduxForm} from 'redux-form';
import {
  load,
  submit as onHandleSubmit,
  onFaultFileUpload,
  onFaultRemove
} from "../actions";
import ViewComponent from "../components/VehicleReport.component";
import {FORMS, REDUCER_KEYS} from "../../../constants/VehicleReport.constant";
import {getList as getVehiclesList} from "../../../../Vehicles/actions";

// Decorate the form component
const DecoratedViewComponent = reduxForm({
  form: FORMS.VEHICLE_FORM_REPORT
})(ViewComponent);

const mapDispatchToProps = {
  load,
  getVehiclesList,
  onHandleSubmit,
  onFaultFileUpload,
  onFaultRemove,
};

const mapStateToProps = (state, ownProps) => {
  const formInfo = state[REDUCER_KEYS.VEHICLE_REPORT_DATA];
  return {
    isFetching: formInfo.isFetching,
    initialValues: formInfo.data,
    vehicles: state[REDUCER_KEYS.VEHICLES],
    errors: formInfo.errors || [],
    onSubmitCustom: ownProps.onSubmitCustom
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DecoratedViewComponent);
