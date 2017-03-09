// export const ACTIONS = {
//   // For Car
//   SET_VEHICLE_DATA: "VEHICLE/SET_VEHICLE_DATA",
//   SET_FORM_MODE: "VEHICLE/SET_FORM_MODE",
//
//   // For Cars
//   SET_VEHICLES_DATA: "VEHICLES/SET_VEHICLE_DATA",
//   SET_VEHICLE_REPORTS_DATA: "VEHICLES_REPORTS/SET_VEHICLE_DATA_REPORTS_LIST",
//   SET_VEHICLE_REVIEWS_DATA: "VEHICLES_REVIEWS/SET_VEHICLE_DATA_REVIEWS_LIST",
//   SET_VEHICLE_FEATURES_DATA: "VEHICLES_FEATURES/SET_VEHICLE_DATA_FEATURES_LIST"
// };

export const FORMS = {
  DEFAULT_REDUX_FORM_KEY: "form", // Do not change the value! redux-forms depends on it.  // TODO: REMOVE
  VEHICLE_FORM: "adminVehicleAddUpdateForm",
};

export const ROUTE_PARAMS = {
  VEHICLE_ID: "vehicleId",

  values: {
    NEW: "new"
  }
};

export const FORM_MODE = {
  READING: "READING",
  ADDING: "ADDING",
  UPDATING: "UPDATING"
};

export const REDUCER_KEYS = {
  VEHICLE_DATA: "vehicleFormInfo",
  VEHICLE_MODELS_DATA: "vehicleModelsData",
  VEHICLE_REPORTS_DATA_LIST: "vehicleReportsDataList",
  VEHICLE_REVIEWS_DATA_LIST: "vehicleReviewsDataList",
  FEATURES_DATA_LIST: "vehicleFeaturesDataList",
  VEHICLES_DATA: "vehiclesData",
  FORM_MODE_VEHICLE: "formMode1"
};
