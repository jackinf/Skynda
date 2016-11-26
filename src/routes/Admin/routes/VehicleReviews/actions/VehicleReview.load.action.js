/**
 * Created by zekar on 10/23/2016.
 */
import {FORM_MODE, REDUCER_KEYS} from "../constants/VehicleReview.constant";
import remoteConfig from "store/remoteConfig";
import {setVehicleReviewData} from "../reducers/SetVehicleReview.reducer";
import {setFormMode} from "../reducers/SetFormMode.reducer";

/**
 * Loads "Create new vehicle review" or "Update existing vehicle review" forms
 * @param param - vehicle review ID
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
  dispatch(setVehicleReviewData({isFetching: false, data: null}));
  dispatch(setFormMode(FORM_MODE.ADDING));
};

/**
 * Private. Fetches data from API and prepares update form.
 * @param id - vehicle review ID.
 */
const loadUpdateForm = (id) => (dispatch) => {
  dispatch(setVehicleReviewData({isFetching: true}));

  return fetch(`${remoteConfig.remote}/api/vehicle-review/${id}`, {
    method: "GET",
    credentials: "include",
    headers: {"Accept": "application/json", "Content-Type": "application/x-www-form-urlencoded"}
  })
    .then(resp => resp.json())
    .then(data => {
      dispatch(setVehicleReviewData({isFetching: false, data}));
      dispatch(setFormMode(FORM_MODE.UPDATING));
    })
    .catch((error) => {
      console.error("ERROR: ", error);
      dispatch(setVehicleReviewData({isFetching: false}));
    });
};
