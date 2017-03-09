import {VehicleService} from "../../../../../webServices"
import {toastr} from "react-redux-toastr";
import getList from "./Vehicles.get-list.actions";

export const DELETE_REQUEST = "VEHICLES/DELETE_REQUEST";
export const DELETE_SUCCESS = "VEHICLES/DELETE_SUCCESS";
export const DELETE_FAILURE = "VEHICLES/DELETE_FAILURE";

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
  return async(dispatch) => {
    dispatch(deleteRequest());
    try {
      await VehicleService.deleteItem(id);
      dispatch(deleteSuccess());
      dispatch(getList());
      toastr.success("Success", "Delete successful");
    } catch (err) {
      dispatch(deleteFailure(err));
      toastr.error("Oh no!", "Delete failed");
    }
  }
}
