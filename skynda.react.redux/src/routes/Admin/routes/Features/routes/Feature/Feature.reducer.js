import {ACTIONS, FORM_MODE} from "./Feature.constant";

export const setFormMode = (state = FORM_MODE.READING_FEATURE, action) => {
  switch (action.type) {
    case ACTIONS.SET_FEATURE_FORM_MODE: {
      return action.payload;
    }

    default:
      return state;
  }
};

export const setFeatureData = (state = {isFetching: false, feature: null}, action) => {
  switch (action.type) {
    case ACTIONS.SET_FEATURE_DATA: {
      return action.payload;
    }

    default:
      return state;
  }
};
