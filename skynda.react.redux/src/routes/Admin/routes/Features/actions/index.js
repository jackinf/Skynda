import {ACTIONS} from "../Features.constant";
import deleteFeature from "./deleteFeature";
import getFeatures from "./getFeatures";

export const setFeaturesList = (value) => ({
  type: ACTIONS.SET_FEATURES_LIST,
  payload: value
});

export {
  deleteFeature,
  getFeatures
}
