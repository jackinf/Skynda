import {REDUCER_KEYS} from "../../../constants/Vehicles.constant";
import {VehicleReviewService} from "../../../../../../../webServices"

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
      let items = getState()[REDUCER_KEYS.VEHICLE_REVIEWS_DATA_LIST].items;
      const result = await VehicleReviewService.deleteItem(id);
      items = items.filter(c => c.id !== id);
      dispatch(deleteSuccess(items));
    }catch (error){
      dispatch(deleteFailure(error));
      throw error;
    }
  };
}
