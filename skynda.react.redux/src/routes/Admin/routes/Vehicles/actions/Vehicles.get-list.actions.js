import {VehicleService} from "../../../../../webServices"

export const GET_LIST_REQUEST = "VEHICLES/GET_LIST_REQUEST";
export const GET_LIST_SUCCESS = "VEHICLES/GET_LIST_SUCCESS";
export const GET_LIST_FAILURE = "VEHICLES/GET_LIST_FAILED";

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
      const resp = await VehicleService.getList();
      dispatch(getListSuccess(resp));
    } catch(err) {
      dispatch(getListError(err));
    }
  }
}

