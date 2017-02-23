import {setVehicleReviewsList} from "./index";
import {REDUCER_KEYS} from "../../../constants/Vehicle.constant";
import {VehicleReviewService} from "../../../../../../../webServices"

export function getList(vehicleId) {
  return (dispatch) => {
    if (!vehicleId) {
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

export function deleteItem(id) {
  return (dispatch, getState) => {
    let items = getState()[REDUCER_KEYS.VEHICLE_REVIEWS_DATA_LIST].items;
    const promise = VehicleReviewService.deleteItem(id);
    promise.then(resp => {
      items = items.filter(c => c.id !== id);
      dispatch(setVehicleReviewsList({isFetching: false, items: items}));
    }).catch(err => {
      throw err;
    });
  };
}

export default {
  getList,
  deleteItem
};

