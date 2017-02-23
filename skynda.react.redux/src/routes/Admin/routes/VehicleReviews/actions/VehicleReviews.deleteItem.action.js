import {setVehicleReviews} from "../actions";
import {REDUCER_KEYS} from "../constants/VehicleReview.constant";
import {VehicleReviewService} from "../../../../../webServices"

export default function deleteItem(id) {
  return (dispatch, getState) => {
    let items = getState()[REDUCER_KEYS.VEHICLES_REVIEWS_DATA].items;
    const promise = VehicleReviewService.deleteItem(id);
    promise.then(resp => {
      items = items.filter(c => c.id !== id);
      dispatch(setVehicleReviews({isFetching: false, items: items}));
    }).catch(err => {
      throw err;
    });
  };
}
