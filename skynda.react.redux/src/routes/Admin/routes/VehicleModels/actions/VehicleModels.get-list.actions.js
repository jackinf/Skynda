/**
 * Created by zekar on 3/6/2017.
 */
import {VehicleModelService} from "../../../../../webServices/VehicleModelServices";

export const GET_LIST_REQUEST = "VEHICLE_MODELS/GET_LIST_REQUEST";
export const GET_LIST_SUCCESS = "VEHICLE_MODELS/GET_LIST_SUCCESS";
export const GET_LIST_FAILURE = "VEHICLE_MODELS/GET_LIST_FAILED";

export function getListRequest() {
  return {
    type: GET_LIST_REQUEST,
    isFetching: true,
    errors: {}
  };
}

export function getListSuccess(items) {
  return {
    type: GET_LIST_SUCCESS,
    isFetching: false,
    items,
    errors: {}
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

export default function getList() {
  return async (dispatch) => {
    dispatch(getListRequest());
    try {
      const resp = await VehicleModelService.getList();
      dispatch(getListSuccess(resp));
    } catch(err) {
      dispatch(getListError(err));
    }
  }
}

