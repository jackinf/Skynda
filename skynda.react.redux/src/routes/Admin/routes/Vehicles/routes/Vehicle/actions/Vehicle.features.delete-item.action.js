import {REDUCER_KEYS} from "../../../constants/Vehicles.constant";
import {VehicleFeatureService} from "../../../../../../../webServices"

export const DELETE_REQUEST = "VEHICLE_FEATURE/DELETE_REQUEST";
export const DELETE_SUCCESS = "VEHICLE_FEATURE/DELETE_SUCCESS";
export const DELETE_FAILURE = "VEHICLE_FEATURE/DELETE_FAILURE";

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
    items: items,
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
      let items = getState()[REDUCER_KEYS.FEATURES_DATA_LIST].items;
      const result = await VehicleFeatureService.deleteItem(id);
      items = items.filter(c => c.id !== id);
      dispatch(deleteSuccess(items));
    }catch (error){
      dispatch(deleteFailure(error));
      throw error;
    }
  };
}
