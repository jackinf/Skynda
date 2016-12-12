/**
 * Created by jevgenir on 12/11/2016.
 */
import fetch from "isomorphic-fetch";
import remoteConfig from "../../../../../store/remoteConfig";

// ------------------------------------
// Actions
// ------------------------------------
const SET_DEALS = "PIPEDRIVE/SET_DEALS";
const SET_STAGES = "PIPEDRIVE/SET_STAGES";

// ------------------------------------
// Thunk Actions
// ------------------------------------

export const getAllDeals = (start = 0) => (dispatch) => {
  console.info("getAllDeals");
  // const selectors = ":(id,title,value,currency)";
  const selectors = "";
  const url = `${remoteConfig.pipeDrive.deals_api}${selectors}?start=${start}&${remoteConfig.pipeDrive.api_token_key_value}`;
  console.log(url);
  return fetch(url, {
    method: "GET",
    headers: {"Accept": "application/json", "Content-Type": "application/json"}
  })
    .then(resp => resp.json())
    .then(resp => {
      if (resp.success) {
        dispatch(setDeals(resp.data));
      }
    });
};

export const getAllStages = (start = 0) => (dispatch) => {
  const selectors = ":(id,name)";
  const url = `${remoteConfig.pipeDrive.stages_api}${selectors}?${remoteConfig.pipeDrive.api_token_key_value}`;
  console.log(url);
  return fetch(url, {
    method: "GET",
    headers: {"Accept": "application/json", "Content-Type": "application/json"}
  })
    .then(resp => resp.json())
    .then(resp => {
      if (resp.success) {
        dispatch(setStages(resp.data));
      }
    });
};

// ------------------------------------
// Action Creators
// ------------------------------------
export function setDeals(deals) {
  return {
    type: SET_DEALS,
    deals
  };
}

export function setStages(stages) {
  return {
    type: SET_STAGES,
    stages
  };
}

// ------------------------------------
// Action Handlers
// ------------------------------------

const ACTION_HANDLERS = {
  [SET_DEALS]: (state, action) => ({...state, type: action.type, deals: action.deals}),
  [SET_STAGES]: (state, action) => ({...state, type: action.type, stages: action.stages})
};

// ------------------------------------
// Reducer
// ------------------------------------

const initialState = {deals: [], stages: []};
export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
