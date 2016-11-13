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
  fillWithFakeData,
  onMainImageUpload,
  onMainImageRemove,
  onImageFileUpload,
  onImageFileRemove,
  onFaultFileUpload,
  onFaultRemove
} from "../actions/Vehicle";
import {getList} from "../../VehicleModels/actions";
import VehicleComponent from "../components/Vehicle.component";
import {FORMS, REDUCER_KEYS} from "../constants/Vehicle.constant";

// Decorate the form component
const DecoratedVehicleComponent = reduxForm({
  form: FORMS.VEHICLE_FORM
})(VehicleComponent);

const mapDispatchToProps = {
  load,
  clear,
  submitVehicleForm,
  setFormMode,
  fillWithFakeData,
  getVehicleModelsList: getList,
  onMainImageUpload,
  onMainImageRemove,
  onImageFileUpload,
  onImageFileRemove,
  onFaultFileUpload,
  onFaultRemove
};

const mapStateToProps = (state) => {
  return {
    isFetching: state[REDUCER_KEYS.VEHICLE_DATA].isFetching,
    initialValues: state[REDUCER_KEYS.VEHICLE_DATA].data,
    formMode1: state[REDUCER_KEYS.FORM_MODE],
    vehicleModels: state[REDUCER_KEYS.VEHICLE_MODELS_DATA]
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DecoratedVehicleComponent);
