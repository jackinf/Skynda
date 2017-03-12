import {REDUCER_KEYS} from "../constants/VehicleReview.constant";
import {VehicleReviewService} from "../../../../../webServices"
import {toastr} from "react-redux-toastr";
import getList from "./VehicleReviews.get-list.action";

export const DELETE_REQUEST = "VEHICLE_REVIEW/DELETE_REQUEST";
export const DELETE_SUCCESS = "VEHICLE_REVIEW/DELETE_SUCCESS";
export const DELETE_FAILURE = "VEHICLE_REVIEW/DELETE_FAILURE";

export function deleteRequest() {
  return {
    type: DELETE_REQUEST,
    isFetching: true,
    errors: {}
  };
}

export function deleteSuccess(items) {
  return {
    type: DELETE_SUCCESS,
    isFetching: false,
    errors: {}
  };
}

export function deleteFailure(errors) {
  return {
    type: DELETE_FAILURE,
    isFetching: false,
    errors
  };
}

export default function deleteItem(id) {
  return async (dispatch, getState) => {
    try{
      dispatch(deleteRequest());
      await VehicleReviewService.deleteItem(id);
      toastr.success("Success", "Delete successful!");
      dispatch(deleteSuccess());
      // dispatch(getList());
    }catch (error){
      console.log(error);
      dispatch(deleteFailure(error));
      toastr.error("Oh no!", "Delete failed!");
      throw error;
    }
  };
}
