/**
 * Created by jevgenir on 10/21/2016.
 */
export const ACTIONS = {
  // For Car
  SET_CAR_DATA: "CAR/SET_CAR_DATA",
  SET_FORM_MODE: "CAR/SET_FORM_MODE",

  // For Cars
  SET_CARS_DATA: "CARS/SET_CAR_DATA"
};

export const FORMS = {
  DEFAULT_REDUX_FORM_KEY: "form", // Do not change the value! redux-forms depends on it.
  CAR_FORM: "adminCarAddUpdateForm",
};

export const ROUTE_PARAMS = {
  CAR_ID: "carId",

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
  CAR_DATA: "carData",
  CARS_DATA: "carsData",
  FORM_MODE: "formMode1"
};
