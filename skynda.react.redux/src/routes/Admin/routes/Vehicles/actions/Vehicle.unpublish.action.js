/**
 * Created by jevgenir on 3/18/2017.
 */

import {VehicleService} from "../../../../../webServices"
import {toastr} from "react-redux-toastr";
import getList from "./Vehicles.get-list.actions";

export const UNPUBLISH_REQUEST = "VEHICLES/UNPUBLISH_REQUEST";
export const UNPUBLISH_SUCCESS = "VEHICLES/UNPUBLISH_SUCCESS";
export const UNPUBLISH_FAILURE = "VEHICLES/UNPUBLISH_FAILURE";

export function unpublishRequest() {
  return {
    type: UNPUBLISH_REQUEST,
    isFetching: true,
    errors: {}
  };
}

export function unpublishSuccess() {
  return {
    type: UNPUBLISH_SUCCESS,
    isFetching: false,
    errors: {}
  };
}

export function unpublishFailure(errors) {
  return {
    type: UNPUBLISH_FAILURE,
    isFetching: false,
    errors
  };
}

export default function deleteItem(id) {
  return async(dispatch) => {
    dispatch(unpublishRequest());
    try {
      await VehicleService.publishItem(id);
      dispatch(unpublishSuccess());
      dispatch(getList());
      toastr.success("Success", "Unpublish successful");
    } catch (err) {
      dispatch(unpublishFailure(err));
      toastr.error("Oh no!", "Unpublish failed");
    }
  }
}
