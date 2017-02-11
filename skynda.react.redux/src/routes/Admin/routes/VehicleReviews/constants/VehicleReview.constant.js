/**
 * Created by jevgenir on 10/21/2016.
 */
export const ACTIONS = {
  // For Vehicle
  SET_VEHICLE_DATA_REVIEW: "VEHICLE/SET_VEHICLE_DATA_REVIEW",
  SET_FORM_MODE_REVIEW: "VEHICLE/SET_FORM_MODE_REVIEW",

  // For Vehicles
  SET_VEHICLES_DATA_REVIEW: "VEHICLES/SET_VEHICLES_DATA_REVIEW"
};

export const FORMS = {
  DEFAULT_REDUX_FORM_KEY: "form", // Do not change the value! redux-forms depends on it.
  VEHICLE_FORM_REVIEW: "adminREVIEWForm",
};

export const ROUTE_PARAMS = {
  VEHICLE_REVIEW_ID: "vehicleReviewId",
  VEHICLE_ID: "vehicleId",
  values: {
    NEW: "new"
  }
};

export const FORM_MODE = {
  READING_REVIEW: "READING_REVIEW",
  ADDING_REVIEW: "ADDING_REVIEW",
  UPDATING_REVIEW: "UPDATING_REVIEW"
};

export const REDUCER_KEYS = {
  VEHICLE_REVIEW_DATA: "vehicleReviewData",
  VEHICLES_REVIEWS_DATA: "vehiclesReviewsData",
  FORM_MODE_VEHICLE_REVIEW: "formModeReview",
  VEHICLES_REVIEW: "vehicles"
};
