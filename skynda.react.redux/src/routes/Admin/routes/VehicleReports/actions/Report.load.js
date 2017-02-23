import {FORM_MODE, REDUCER_KEYS, ROUTE_PARAMS} from "../constants/VehicleReport.constant";
import {setVehicleReportData, setFormMode} from "../actions";
import {VehicleReportService} from "../../../../../webServices"

/**
 * Loads "Create new vehicle review" or "Update existing vehicle review" forms
 * @param param - vehicle review ID
 */
export default (param) => (dispatch, getState) => {
  let currentFormMode = getState()[REDUCER_KEYS.FORM_MODE_VEHICLE_REPORT] || FORM_MODE.ADDING_REPORT;

  //TODO bad hack for updating single item
  if (!isNaN(parseInt(param))) {
    currentFormMode = FORM_MODE.UPDATING_REPORT;  //What if user only wants to read data?
  } else if (isNaN(parseInt(param) && param == ROUTE_PARAMS.values.NEW)) {
    currentFormMode = FORM_MODE.ADDING_REPORT;
  }

  if (currentFormMode === FORM_MODE.ADDING_REPORT) {
    dispatch(loadCreateForm());
  } else if (currentFormMode == FORM_MODE.UPDATING_REPORT && !isNaN(parseInt(param))) {
    dispatch(loadUpdateForm(parseInt(param)));
  } else {
    console.error("Invalid form mode");
  }
};

/**
 * Private. Initializes a create form.
 */
const loadCreateForm = () => (dispatch) => {
  dispatch(setVehicleReportData({isFetching: false, data: null}));
  dispatch(setFormMode(FORM_MODE.ADDING_REPORT));
};

/**
 * Private. Fetches data from API and prepares update form.
 * @param id - vehicle review ID.
 */
const loadUpdateForm = (id) => (dispatch) => {
  dispatch(setVehicleReportData({isFetching: true}));
  const promise = VehicleReportService.loadUpdateForm(id);
  promise.then(data => {
    dispatch(setVehicleReportData({isFetching: false, data}));
    dispatch(setFormMode(FORM_MODE.UPDATING_REPORT));
  }).catch((error) => {
    dispatch(setVehicleReportData({isFetching: false}));
    throw error;
  });
};
