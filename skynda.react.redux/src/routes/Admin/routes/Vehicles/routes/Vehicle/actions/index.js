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

import vehicleFeaturesDeleteItem  from "./Vehicle.features.delete-item.action";
import vehicleFeaturesGetList     from "./Vehicle.features.get-list.action";
import vehicleLoad                from "./Vehicle.load.action";
import vehicleReportsDeleteItem   from "./Vehicle.reports.delete-item.action";
import vehicleReportsGetList      from "./Vehicle.reports.get-list.action";
import vehicleReviewDeleteItem    from "./Vehicle.reviews.delete-item.action";
import vehicleReviewsGetList      from "./Vehicle.reviews.get-list.action";
import vehicleSubmit              from "./Vehicle.submit.action";

export {
  onFaultFileUpload,
  onFaultRemove,
  onImageFileRemove,
  onImageFileUpload,
  onMainImageCropComplete,
  onMainImageRemove,
  onMainImageUpload,

  vehicleFeaturesDeleteItem,
  vehicleFeaturesGetList,
  vehicleLoad,
  vehicleReportsDeleteItem,
  vehicleReportsGetList,
  vehicleReviewDeleteItem,
  vehicleReviewsGetList,
  vehicleSubmit
}
