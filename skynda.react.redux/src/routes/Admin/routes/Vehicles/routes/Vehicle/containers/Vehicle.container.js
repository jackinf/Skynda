import {connect} from "react-redux";
import {
  onImageFileRemove,
  onImageFileUpload,
  onMainImageCropComplete,
  vehicleFeaturesGetList,
  vehicleLoad as load,
  vehicleSubmit as submit,
} from "../actions";

import {
  getList as getVehicleReportsList,
  deleteItem as deleteReport
} from "../../../../VehicleReports/actions";

import {
  getList as getVehicleReviewsList,
  deleteItem as deleteReview
} from "../../../../VehicleReviews/actions";

import {getList as getVehicleModelsList} from "../../../../VehicleModels/actions";
import {getList as getVehicles} from "../../../actions"
import {REDUCER_KEYS, VEHICLE_FORM_KEY} from "../../../constants/Vehicles.constant";
import VehicleComponent from "../components/Vehicle.component";
import {reduxForm} from "redux-form";

const VehicleComponentForm = reduxForm({form: VEHICLE_FORM_KEY})(VehicleComponent);

const mapDispatchToProps = {
  getVehicleModelsList,
  getVehicleReportsList,
  deleteSingleReportItem: deleteReport,
  getVehicleReviewsList,
  deleteSingleReview: deleteReview,
  vehicleFeaturesGetList,
  onMainImageCropComplete: onMainImageCropComplete,
  onImageFileUpload: onImageFileUpload,
  onImageFileRemove: onImageFileRemove,
  getVehicles,
  onHandleLoad: load,
  onHandleSubmit: submit
};

const mapStateToProps = (state) => {
  let formInfo = state[REDUCER_KEYS.VEHICLE_DATA];
  let classificators = state.classificators;  // TODO: reducer key

  return {
    id: formInfo.item ? formInfo.item.id : "new",
    isFetching: formInfo.isFetching,
    initialValues: formInfo.item,
    formModeVehicle: formInfo.formMode,
    errors: formInfo.errors || [],
    vehicleModels: state[REDUCER_KEYS.VEHICLE_MODELS_DATA],
    vehicleReports: state[REDUCER_KEYS.VEHICLE_REPORTS_DATA_LIST],
    vehicleReviews: state[REDUCER_KEYS.VEHICLE_REVIEWS_DATA_LIST],
    featuresList: state[REDUCER_KEYS.FEATURES_DATA_LIST],
    colors: classificators ? classificators.color : {}
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(VehicleComponentForm);
