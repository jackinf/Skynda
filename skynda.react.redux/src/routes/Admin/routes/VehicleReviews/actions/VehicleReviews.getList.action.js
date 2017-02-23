import {setVehicleReviews} from "../actions";
import {VehicleReviewService} from "../../../../../webServices"

export default function getList() {
  return (dispatch) => {
    dispatch(setVehicleReviews({isFetching: true}));
    const promise = VehicleReviewService.getList();
    promise.then(resp => {
      dispatch(setVehicleReviews({isFetching: false, items: resp}));
    }).catch(err => {
      dispatch(setVehicleReviews({isFetching: false, items: []}));
      throw err;
    });
  };
}
