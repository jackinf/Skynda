/**
 * Created by zekar on 10/23/2016.
 */
import {FORM_MODE, REDUCER_KEYS} from "../../constants/Vehicle.constant";
import remoteConfig from "store/remoteConfig";
import {setVehicleData} from "../../reducers/Vehicle.reducer";
import {setFormMode} from "./../../reducers/SetFormMode.reducer";

/**
 * Loads "Create new vehicle" or "Update existing vehicle" forms
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
  dispatch(setVehicleData({isFetching: false, data: null}));
  dispatch(setFormMode(FORM_MODE.ADDING));
};

/**
 * Private. Fetches data from API and prepares update form.
 * @param id - vehicle ID.
 */
const loadUpdateForm = (id) => (dispatch) => {
  dispatch(setVehicleData({isFetching: true}));

  return fetch(`${remoteConfig.remote}/api/vehicle/${id}`, {
    method: "GET",
    credentials: "include",
    headers: {"Accept": "application/json", "Content-Type": "application/x-www-form-urlencoded"}
  })
    .then(resp => resp.json())
    .then(data => {
      dispatch(setVehicleData({isFetching: false, data}));
      dispatch(setFormMode(FORM_MODE.UPDATING));
    })
    .catch((error) => {
      console.error("ERROR: ", error);
      dispatch(setVehicleData({isFetching: false}));
    });
};
