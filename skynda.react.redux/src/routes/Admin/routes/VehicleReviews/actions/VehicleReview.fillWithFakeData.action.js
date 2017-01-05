/**
 * Created by jevgenir on 10/24/2016.
 */
import {setVehicleReviewData} from "../reducers/SetVehicleReview.reducer";

export default function fillWithFakeData() {
  const fakeData = {};
  return (dispatch) => dispatch(setVehicleReviewData({isFetching: false, data: fakeData}));
}
