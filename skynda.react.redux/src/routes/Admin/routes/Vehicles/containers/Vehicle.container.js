import {connect} from "react-redux";
import {
  onMainImageUpload,
  onMainImageRemove,
  onMainImageCropComplete,
  onImageFileUpload,
  onImageFileRemove,
  onFaultFileUpload,
  onFaultRemove
} from "../actions/Vehicle.image.actions";
import {load, clear, onHandleSubmitFinished} from "../reducers/Vehicle.reducer";
import {getList as getVehicleModelsList} from "../../VehicleModels/reducers/VehicleModels.reducer";
import {REDUCER_KEYS} from "../constants/Vehicle.constant";
import VehicleComponent from "../components/Vehicle.component";

const mapDispatchToProps = {
  load,
  clear,
  getVehicleModelsList,
  onMainImageUpload: onMainImageUpload,
  onMainImageRemove: onMainImageRemove,
  onMainImageCropComplete: onMainImageCropComplete,
  onImageFileUpload: onImageFileUpload,
  onImageFileRemove: onImageFileRemove,
  onHandleSubmitFinished: onHandleSubmitFinished
};

const mapStateToProps = (state) => {
  let formInfo = state[REDUCER_KEYS.VEHICLE_DATA];
  let classificators = state.classificators;
  return {
    id: formInfo.id,
    isFetching: formInfo.isFetching,
    initialValues: formInfo.item,
    formModeVehicle: formInfo.formMode,
    errors: formInfo.errors || [],
    vehicleModels: state[REDUCER_KEYS.VEHICLE_MODELS_DATA],
    colors: classificators ? classificators.color : {}
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(VehicleComponent);
