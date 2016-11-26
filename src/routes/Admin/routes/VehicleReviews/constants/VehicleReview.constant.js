/**
 * Created by jevgenir on 10/21/2016.
 */
export const ACTIONS = {
  // For Car
  SET_VEHICLE_DATA: "VEHICLE/SET_VEHICLE_DATA",
  SET_FORM_MODE: "VEHICLE/SET_FORM_MODE",

  // For Cars
  SET_VEHICLES_DATA: "VEHICLES/SET_VEHICLE_DATA"
};

export const FORMS = {
  DEFAULT_REDUX_FORM_KEY: "form", // Do not change the value! redux-forms depends on it.
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
  VEHICLE_DATA: "vehicleData",
  VEHICLE_MODELS_DATA: "vehicleModelsData",
  VEHICLES_DATA: "vehiclesData",
  FORM_MODE: "formMode1"
};
