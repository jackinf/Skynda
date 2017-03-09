import {VehicleReportService} from "../../../../../../../webServices"

export const GET_LIST_REQUEST = "VEHICLE_REPORT/GET_LIST_REQUEST";
export const GET_LIST_SUCCESS = "VEHICLE_REPORT/GET_LIST_SUCCESS";
export const GET_LIST_FAILURE = "VEHICLE_REPORT/GET_LIST_FAILED";

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
      const result = await VehicleReportService.getVehicleReports(vehicleId);
      dispatch(getListSuccess(result));
    }catch (error){
      dispatch(getListError(error));
      throw error;
    }

  };
}
