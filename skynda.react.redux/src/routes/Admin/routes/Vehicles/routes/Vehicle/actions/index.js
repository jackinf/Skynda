// import {ACTIONS} from "../../../constants/Vehicles.constant"
//
// export const setVehicleReportsList = (value) => ({
//   type: ACTIONS.SET_VEHICLE_REPORTS_DATA,
//   payload: value
// });
//
// export const setVehicleReviewsList = (value) => ({
//   type: ACTIONS.SET_VEHICLE_REVIEWS_DATA,
//   payload: value
// });
//
// export const setFeaturesList = (value) => ({
//   type: ACTIONS.SET_VEHICLE_FEATURES_DATA,
//   payload: value
// });

import {
  onFaultFileUpload,
  onFaultRemove,
  onImageFileRemove,
  onImageFileUpload,
  onMainImageCropComplete,
  onMainImageRemove,
  onMainImageUpload
} from "./VehicleImageActions";

import vehicleFeaturesGetList     from "./Vehicle.features.get-list.action";
import vehicleLoad                from "./Vehicle.load.action";
import vehicleSubmit              from "./Vehicle.submit.action";
import vehicleClear               from "./Vehicle.clear.action"

export {
  onFaultFileUpload,
  onFaultRemove,
  onImageFileRemove,
  onImageFileUpload,
  onMainImageCropComplete,
  onMainImageRemove,
  onMainImageUpload,

  vehicleFeaturesGetList,
  vehicleLoad,
  vehicleSubmit,
  vehicleClear
}
