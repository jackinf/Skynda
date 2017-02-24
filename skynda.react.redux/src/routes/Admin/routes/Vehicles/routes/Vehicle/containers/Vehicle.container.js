import {connect} from "react-redux";
import {
  onMainImageUpload,
  onMainImageRemove,
  onMainImageCropComplete,
  onImageFileUpload,
  onImageFileRemove,
} from "../actions/Vehicle.image.actions";
import {load, clear, onHandleSubmitFinished} from "../reducers/Vehicle.reducer";
import {getList as getVehicleModelsList} from "../../../../VehicleModels/reducers/VehicleModels.reducer";
import {getList as getVehicleReportsList, deleteItem as deleteReport} from "../actions/Vehicle.Reports.actions";
import {getList as getVehicleReviewsList, deleteItem as deleteReview} from "../actions/Vehicle.Reviews.actions";
import {getList as getFeaturesList, deleteItem as deleteFeature} from "../actions/Vehicle.Features.actions";
import {getList as getVehicles} from "../../../actions"
import {REDUCER_KEYS} from "../../../constants/Vehicle.constant";
import VehicleComponent from "../components/Vehicle.component";

const mapDispatchToProps = {
  load,
  clear,
  getVehicleModelsList,
  getVehicleReportsList: getVehicleReportsList,
  deleteSingleReportItem: deleteReport,
  getVehicleReviewsList: getVehicleReviewsList,
  deleteSingleReview: deleteReview,
  getFeaturesList: getFeaturesList,
  deleteSingleFeature: deleteFeature,
  onMainImageUpload: onMainImageUpload,
  onMainImageRemove: onMainImageRemove,
  onMainImageCropComplete: onMainImageCropComplete,
  onImageFileUpload: onImageFileUpload,
  onImageFileRemove: onImageFileRemove,
  onHandleSubmitFinished: onHandleSubmitFinished,
  getVehicles
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
    vehicleReports: state[REDUCER_KEYS.VEHICLE_REPORTS_DATA_LIST],
    vehicleReviews: state[REDUCER_KEYS.VEHICLE_REVIEWS_DATA_LIST],
    colors: classificators ? classificators.color : {},
    featuresList: state[REDUCER_KEYS.FEATURES_DATA_LIST]
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(VehicleComponent);
