import {setVehicleReviewData} from "../actions";

export default () => (dispatch) => dispatch(setVehicleReviewData({isFetching: false, data: null}));
