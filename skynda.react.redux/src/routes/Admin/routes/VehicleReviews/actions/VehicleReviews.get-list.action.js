import {VehicleReviewService} from "../../../../../webServices"

export const GET_LIST_REQUEST = "VEHICLE_REVIEWS/GET_LIST_REQUEST";
export const GET_LIST_SUCCESS = "VEHICLE_REVIEWS/GET_LIST_SUCCESS";
export const GET_LIST_FAILURE = "VEHICLE_REVIEWS/GET_LIST_FAILED";

export function getListRequest() {
  return {
    type: GET_LIST_REQUEST,
    isFetching: true,
    errors: []
  };
}

export function getListSuccess(items) {
  return {
    type: GET_LIST_SUCCESS,
    isFetching: false,
    items,
    errors: []
  };
}

export function getListError(errors) {
  return {
    type: GET_LIST_FAILURE,
    isFetching: false,
    items: [],
    errors: errors
  };
}

export default function getList(vehicleId) {
  return async (dispatch) => {

    if (!vehicleId || vehicleId == "new") {
      return null;
    }

    dispatch(getListRequest());

    try{
      const result = await VehicleReviewService.getVehicleReviews(vehicleId);
      dispatch(getListSuccess(result));
    }catch (error){
      dispatch(getListError(error));
      throw error;
    }

  };
}
