import {REDUCER_KEYS} from "../constants/VehicleModel.constant";
import {VehicleModelService} from "../../../../../webServices"
import {toastr} from "react-redux-toastr";
import getList from "./VehicleModels.get-list.actions";

export const DELETE_REQUEST = "VEHICLE_MODELS/DELETE_REQUEST";
export const DELETE_SUCCESS = "VEHICLE_MODELS/DELETE_SUCCESS";
export const DELETE_FAILURE = "VEHICLE_MODELS/DELETE_FAILURE";

export function deleteRequest() {
  return {
    type: DELETE_REQUEST,
    isFetching: true,
    errors: {}
  };
}

export function deleteSuccess() {
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
  return async(dispatch, getState) => {
    dispatch(deleteRequest());
    try {
      await VehicleModelService.deleteItem(id);
      dispatch(deleteSuccess());
      dispatch(getList());
      toastr.success("Success", "Delete successful");
    } catch (err) {
      dispatch(deleteFailure(err));
      toastr.error("Oh no!", "Delete failed");
    }
  }
}
