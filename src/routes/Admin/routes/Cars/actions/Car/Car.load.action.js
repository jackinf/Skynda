/**
 * Created by zekar on 10/23/2016.
 */
import {FORM_MODE, REDUCER_KEYS} from "./../../constants/Car.constant";
import remoteConfig from "store/remoteConfig";
import setCarData from "./Car.setCarData.action";
import setFormMode from "./Car.setFormMode.action";

/**
 * Loads "Create new car" or "Update existing car" forms
 * @param param
 */
export default (param) => (dispatch, getState) => {
  const currentFormMode = getState()[REDUCER_KEYS.FORM_MODE];

  if (currentFormMode === FORM_MODE.ADDING) {
    dispatch(loadCreateForm());
  } else if (currentFormMode == FORM_MODE.UPDATING && !isNaN(parseInt(param))) {
    dispatch(loadUpdateForm(parseInt(param)));
  } else {
    console.error("Invalid form mode");
  }
};

/**
 * Private. Initializes a create form.
 */
const loadCreateForm = () => (dispatch) => {
  dispatch(setCarData({isFetching: false, data: null}));
  dispatch(setFormMode(FORM_MODE.ADDING));
};

/**
 * Private. Fetches data from API and prepares update form.
 * @param param - car ID.
 */
const loadUpdateForm = (id) => (dispatch) => {
  dispatch(setCarData({isFetching: true}));

  return fetch(`${remoteConfig.remote}/api/car/${id}`, {
    method: "GET",
    headers: {"Accept": "application/json", "Content-Type": "application/json"}
  })
    .then(resp => resp.json())
    .then(data => {
      dispatch(setCarData({isFetching: false, data}));
      dispatch(setFormMode(FORM_MODE.UPDATING));
    })
    .catch((error) => {
      console.error("ERROR: ", error);
      dispatch(setCarData({isFetching: false}));
    });
};
