import {setVehicleReviewData} from "../reducers/SetVehicleReview.reducer";

export default () => (dispatch) => dispatch(setVehicleReviewData({isFetching: false, data: null}));
