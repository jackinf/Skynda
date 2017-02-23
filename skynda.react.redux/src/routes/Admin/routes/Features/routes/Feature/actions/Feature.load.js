import {FORM_MODE, REDUCER_KEYS, ROUTE_PARAMS} from "../Feature.constant";
import {setFeatureData, setFormMode} from "../actions";
import {FeatureService} from "../../../../../../../webServices"

/**
 * Loads "Create new vehicle review" or "Update existing vehicle review" forms
 * @param param - vehicle review ID
 */
export default (param) => (dispatch, getState) => {
  let currentFormMode = getState()[REDUCER_KEYS.FEATURE_FORM_MODE] || FORM_MODE.ADDING_FEATURE;

  //TODO bad hack for updating single item
  if (!isNaN(parseInt(param))) {
    currentFormMode = FORM_MODE.UPDATING_FEATURE;  //What if user only wants to read data?
  } else if (isNaN(parseInt(param) && param == ROUTE_PARAMS.NEW)) {
    currentFormMode = FORM_MODE.ADDING_FEATURE;
  }

  if (currentFormMode === FORM_MODE.ADDING_FEATURE) {
    dispatch(loadCreateForm());
  } else if (currentFormMode == FORM_MODE.UPDATING_FEATURE && !isNaN(parseInt(param))) {
    dispatch(loadUpdateForm(parseInt(param)));
  } else {
    console.error("Invalid form mode");
  }
};

/**
 * Private. Initializes a create form.
 */
const loadCreateForm = () => (dispatch) => {
  dispatch(setFeatureData({isFetching: false, data: null}));
  dispatch(setFormMode(FORM_MODE.ADDING_FEATURE));
};

/**
 * Private. Fetches data from API and prepares update form.
 * @param id - feature ID.
 */
const loadUpdateForm = (id) => (dispatch) => {
  dispatch(setFeatureData({isFetching: true}));
  const promise = FeatureService.loadUpdateForm(id);
  promise.then(data => {
    dispatch(setFeatureData({isFetching: false, data}));
    dispatch(setFormMode(FORM_MODE.UPDATING_FEATURE));
  }).catch((error) => {
    dispatch(setFeatureData({isFetching: false}));
    throw error;
  });
};
