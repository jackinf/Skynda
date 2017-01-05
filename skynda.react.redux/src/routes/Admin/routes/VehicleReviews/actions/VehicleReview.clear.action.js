/**
 * Created by zekar on 10/23/2016.
 */
import {setVehicleReviewData} from "../reducers/SetVehicleReview.reducer";

export default () => (dispatch) => dispatch(setVehicleReviewData({isFetching: false, data: null}));
