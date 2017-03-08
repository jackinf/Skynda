import {setVehicleReviewsList} from "./index";
import {REDUCER_KEYS} from "../../../constants/Vehicles.constant";
import {VehicleReviewService} from "../../../../../../../webServices"

export default function getList(vehicleId) {
  return (dispatch) => {
    if (!vehicleId || vehicleId == "new") {
      return null;
    }

    dispatch(setVehicleReviewsList({isFetching: true}));

    const promise = VehicleReviewService.getVehicleReviews(vehicleId);
    promise.then(resp => {
      dispatch(setVehicleReviewsList({isFetching: false, items: resp}));
    }).catch(err => {
      dispatch(setVehicleReviewsList({isFetching: false, items: []}));
      throw err;
    });
  };
}

