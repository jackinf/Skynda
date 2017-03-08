/**
 * Created by zekar on 3/8/2017.
 */
import {setVehicleReviewsList} from "./index";
import {REDUCER_KEYS} from "../../../constants/Vehicles.constant";
import {VehicleReviewService} from "../../../../../../../webServices"

export default function deleteItem(id) {
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
