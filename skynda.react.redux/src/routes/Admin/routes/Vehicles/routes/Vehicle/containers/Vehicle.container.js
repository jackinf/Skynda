import {connect} from "react-redux";
import {
  onImageFileRemove,
  onImageFileUpload,
  onMainImageCropComplete,
  onMainImageRemove,
  onMainImageUpload,

  vehicleFeaturesDeleteItem as deleteFeature,
  vehicleFeaturesGetList as getFeaturesList,
  vehicleLoad as load,
  vehicleReportsDeleteItem as deleteReport,
  vehicleReportsGetList as getVehicleReportsList,
  vehicleReviewDeleteItem as deleteReview,
  vehicleReviewsGetList as getVehicleReviewsList
} from "../actions";
import {getList as getVehicleModelsList} from "../../../../VehicleModels/actions";
import {getList as getVehicles} from "../../../actions"
import {REDUCER_KEYS, FORMS} from "../../../constants/Vehicles.constant";
import VehicleComponent from "../components/Vehicle.component";
import {reduxForm} from "redux-form";

const VehicleComponentForm = reduxForm({form: FORMS.VEHICLE_FORM})(VehicleComponent);

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
  let classificators = state.classificators;  // TODO: reducer key

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

export default connect(mapStateToProps, mapDispatchToProps)(VehicleComponentForm);
