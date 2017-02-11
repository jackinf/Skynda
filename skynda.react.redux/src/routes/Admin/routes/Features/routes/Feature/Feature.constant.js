// For FEATURE
export const ACTIONS = {
  SET_FEATURE_DATA: "ADMIN/SET_FEATURE_DATA",
  SET_FEATURE_FORM_MODE: "ADMIN/SET_FEATURE_FORM_MODE",
};

export const FORMS = {
  DEFAULT_REDUX_FORM_KEY: "form", // Do not change the value! redux-forms depends on it.
  FEATURE_FORM: "adminFeatureAddUpdateForm",
};

export const ROUTE_PARAMS = {
  FEATURE_ID: "featureId",
  NEW: "new"
};

export const FORM_MODE = {
  READING_FEATURE: "READING_FEATURE",
  ADDING_FEATURE: "ADDING_FEATURE",
  UPDATING_FEATURE: "UPDATING_FEATURE"
};

export const REDUCER_KEYS = {
  FEATURE_DATA: "featureData",
  FEATURE_FORM_MODE: "formModeFeature"
};
