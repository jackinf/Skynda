import {ACTIONS, FORM_MODE} from "../constants/VehicleReview.constant";

export const setFormMode = (state = FORM_MODE.READING_REVIEW, action) => {
  switch (action.type) {
    case ACTIONS.SET_FORM_MODE_REVIEW: {
      return action.payload;
    }

    default:
      return state;
  }
};

export const setVehicleReviewData = (state = {isFetching: false, car: null}, action) => {
  switch (action.type) {
    case ACTIONS.SET_VEHICLE_DATA_REVIEW: {
      return action.payload;
    }

    default:
      return state;
  }
};



export const setVehicleReviews = (state = {isFetching: false, items: []}, action) => {
  switch (action.type) {
    case ACTIONS.SET_VEHICLES_DATA_REVIEW: {
      return action.payload;
    }
    default:
      return state;
  }
};
