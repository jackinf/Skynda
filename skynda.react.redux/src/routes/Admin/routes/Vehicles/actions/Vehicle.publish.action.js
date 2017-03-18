/**
 * Created by jevgenir on 3/18/2017.
 */

import {VehicleService} from "../../../../../webServices"
import {toastr} from "react-redux-toastr";
import getList from "./Vehicles.get-list.actions";

export const PUBLISH_REQUEST = "VEHICLES/PUBLISH_REQUEST";
export const PUBLISH_SUCCESS = "VEHICLES/PUBLISH_SUCCESS";
export const PUBLISH_FAILURE = "VEHICLES/PUBLISH_FAILURE";

export function publishRequest() {
  return {
    type: PUBLISH_REQUEST,
    isFetching: true,
    errors: {}
  };
}

export function publishSuccess() {
  return {
    type: PUBLISH_SUCCESS,
    isFetching: false,
    errors: {}
  };
}

export function publishFailure(errors) {
  return {
    type: PUBLISH_FAILURE,
    isFetching: false,
    errors
  };
}

export default function publishItem(id) {
  return async(dispatch) => {
    dispatch(publishRequest());
    try {
      await VehicleService.publishItem(id);
      dispatch(publishSuccess());
      dispatch(getList());
      toastr.success("Success", "Publish successful");
    } catch (err) {
      dispatch(publishFailure(err));
      toastr.error("Oh no!", "Publish failed");
    }
  }
}
