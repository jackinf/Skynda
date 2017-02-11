import {ACTIONS} from "../../../constants/Vehicle.constant";

export const setVehicleReviewsList = (state = {isFetching: false, items: []}, action) => {
  switch (action.type) {
    case ACTIONS.SET_VEHICLE_REVIEWS_DATA: {
      return action.payload;
    }

    default:
      return state;
  }
};
