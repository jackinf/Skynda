import {ACTIONS} from "./Features.constant"

export const setFeaturesList = (state = {isFetching: false, items: []}, action) => {
  switch (action.type) {
    case ACTIONS.SET_FEATURES_LIST: {
      return action.payload;
    }
    default:
      return state;
  }
};
