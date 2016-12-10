/**
 * Created by zekar on 10/23/2016.
 */
import {connect} from "react-redux";
import reduxFormHelperActions from "../actions/Vehicle.image.actions";
import {load, clear, onHandleSubmitFinished} from "../reducers/Vehicle.reducer";
import {getList as getVehicleModelsList} from "../../VehicleModels/reducers/VehicleModels.reducer";
import {getColors} from "../../Classifiers/Classifiers.module";
import {REDUCER_KEYS} from "../constants/Vehicle.constant";
import VehicleComponent from "../components/Vehicle.component";

const mapDispatchToProps = {
  load,
  clear,
  getVehicleModelsList,
  getColors,

  onMainImageUpload: reduxFormHelperActions.onMainImageUpload,
  onMainImageRemove: reduxFormHelperActions.onMainImageRemove,
  onImageFileUpload: reduxFormHelperActions.onImageFileUpload,
  onImageFileRemove: reduxFormHelperActions.onImageFileRemove,
  onFaultFileUpload: reduxFormHelperActions.onFaultFileUpload,
  onFaultRemove: reduxFormHelperActions.onFaultRemove,

  onHandleSubmitFinished: onHandleSubmitFinished
};

const mapStateToProps = (state) => {
  let formInfo = state[REDUCER_KEYS.VEHICLE_DATA];
  let classificators = state.classificators;

  return {
    isFetching: formInfo.isFetching,
    initialValues: formInfo.item,
    formMode1: formInfo.formMode,

    vehicleModels: state[REDUCER_KEYS.VEHICLE_MODELS_DATA],
    colors: classificators ? classificators.color : {}
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(VehicleComponent);
