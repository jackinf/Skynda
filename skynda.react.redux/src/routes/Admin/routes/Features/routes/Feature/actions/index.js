import {ACTIONS} from "../Feature.constant";
import load from "./Feature.load";
import clear from "./Feature.clear";
import {formSubmit, onFormSubmitSuccess} from "./Feature.form.action"

export const setFormMode = (value) => ({
  type: ACTIONS.SET_FEATURE_FORM_MODE,
  payload: value
});

export const setFeatureData = (value) => ({
  type: ACTIONS.SET_FEATURE_DATA,
  payload: value
});


export {
  clear,
  load,
  formSubmit,
  onFormSubmitSuccess
}
