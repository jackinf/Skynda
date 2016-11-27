/**
 * Created by jevgenir on 11/13/2016.
 */
import fetch from "isomorphic-fetch";
import remoteConfig from "store/remoteConfig";

// ------------------------------------
// Actions
// ------------------------------------
const SET_FEATURES = "CLASSIFIER/SET_FEATURES";
const SET_PAYMENT_TYPES = "CLASSIFIER/SET_PAYMENT_TYPES";
const SET_DRIVETRAINS = "CLASSIFIER/SET_DRIVETRAINS";
const SET_TRANSMISSIONS = "CLASSIFIER/SET_TRANSMISSIONS";
const SET_PAYMENT_STATUS = "CLASSIFIER/SET_PAYMENT_STATUS";
const SET_MANUFACTURERS = "CLASSIFIER/SET_MANUFACTURERS";
const SET_COLORS = "CLASSIFIER/SET_COLORS";
const SET_FUELS = "CLASSIFIER/SET_FUELS";
const SET_VEHICLE_BODIES = "CLASSIFIER/SET_VEHICLE_BODIES";

// ------------------------------------
// Async Action Creators
// ------------------------------------

export const getFeatures = () => getList(SET_FEATURES, "FEATURE");
export const getPaymentTypes = () => getList(SET_PAYMENT_TYPES, "PAYMENT_TYPE");
export const getDrivetrains = () => getList(SET_DRIVETRAINS, "DRIVETRAIN");
export const getTransmissions = () => getList(SET_TRANSMISSIONS, "TRANSMISSION");
export const getPaymentStatuses = () => getList(SET_PAYMENT_STATUS, "PAYMENT_STATUS");
export const getManufacturers = () => getList(SET_MANUFACTURERS, "MANUFACTURER");
export const getColors = () => getList(SET_COLORS, "COLOR");
export const getFuels = () => getList(SET_FUELS, "FUEL");
export const getVehicleBodies = () => getList(SET_VEHICLE_BODIES, "VEHICLE_BODY");

/**
 * Generic way to get classifiers
 * @param actionType
 * @param classificationTypeName
 * @returns {function(*)}
 */
function getList(actionType, classificationTypeName = "") {
  return (dispatch) => {
    dispatch(setItems(actionType, [], true));

    return fetch(`${remoteConfig.remote}/api/classifications/${classificationTypeName}`, {
      method: "GET",
      credentials: "include",
      headers: {"Accept": "application/json", "Content-Type": "application/x-www-form-urlencoded"}
    })
      .then(resp => resp.json())
      .then(resp => {
        console.info("Classifications response", resp);
        dispatch(setItems(actionType, resp, false));
      })
      .catch(err => {
        console.error(err);
        dispatch(setItems(actionType, [], false));
      });
  };
}

// ------------------------------------
// Action Creators
// ------------------------------------

export function setItems(actionType, items, isFetching) {
  return {
    type: actionType,
    isFetching: isFetching,
    items: items
  };
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SET_FEATURES]: (state, action) => ({
    ...state,
    feature:        {items: action.items, isFetching: action.isFetching}
  }),
  [SET_PAYMENT_TYPES]: (state, action) => ({
    ...state,
    paymentType:    {items: action.items, isFetching: action.isFetching}
  }),
  [SET_DRIVETRAINS]: (state, action) => ({
    ...state,
    drivetrain:     {items: action.items, isFetching: action.isFetching}}),
  [SET_TRANSMISSIONS]: (state, action) => ({
    ...state,
    transmission:   {items: action.items, isFetching: action.isFetching}
  }),
  [SET_PAYMENT_STATUS]: (state, action) => ({
    ...state,
    paymentStatus:  {items: action.items, isFetching: action.isFetching}
  }),
  [SET_MANUFACTURERS]: (state, action) => ({
    ...state,
    manufacturer:   {items: action.items, isFetching: action.isFetching}
  }),
  [SET_COLORS]: (state, action) => ({
    ...state,
    color:          {items: action.items, isFetching: action.isFetching}}),
  [SET_FUELS]: (state, action) => ({
    ...state,
    fuel:           {items: action.items, isFetching: action.isFetching}}),
  [SET_VEHICLE_BODIES]: (state, action) => ({
    ...state,
    vehicleBody:    {items: action.items, isFetching: action.isFetching}}),
};

// ------------------------------------
// Reducer
// ------------------------------------
const itemsDefaultObject = {items: [], isFetching: false};
const initialState = {
  feature: {...itemsDefaultObject},
  paymentType: {...itemsDefaultObject},
  drivetrain: {...itemsDefaultObject},
  transmission: {...itemsDefaultObject},
  paymentStatus: {...itemsDefaultObject},
  manufacturer: {...itemsDefaultObject},
  color: {...itemsDefaultObject},
  fuel: {...itemsDefaultObject},
  vehicleBody: {...itemsDefaultObject}
};

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
