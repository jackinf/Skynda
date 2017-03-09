import {ACTIONS} from "../../../constants/Vehicles.constant";

export const setFeaturesList = (state = {isFetching: false, items: []}, action) => {
  switch (action.type) {
    case ACTIONS.SET_VEHICLE_FEATURES_DATA: {
      return action.payload;
    }

    default:
      return state;
  }
};
