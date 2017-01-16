/**
 * Created by jevgenir on 1/14/2017.
 */

import fetch from "isomorphic-fetch";
import remoteConfig from "store/remoteConfig";

const defaultImage = {};

// ------------------------------------
// Actions
// ------------------------------------
const SET_IMAGE = "CROP_TOOL/SET_IMAGE";

// ------------------------------------
// Async Action Creators
// ------------------------------------

/**
 *
 * @returns {function(*)}
 */
export function cropImageAsync() {
  return (dispatch) => {
    dispatch(setImages([], true));

    return fetch(`${remoteConfig.remote}/api/image/crop`, {
      method: "GET",
      credentials: "include",
      headers: {"Accept": "application/json", "Content-Type": "application/json"}
    })
      .then(resp => resp.json())
      .then(resp => {
        console.info("Images response", resp);
        dispatch(setImages(resp, false));
      })
      .catch(err => {
        console.error(err);
        dispatch(setImages(defaultImage, false));
      });
  };
}

// ------------------------------------
// Action Creators
// ------------------------------------

function setImages(item, isFetching) {
  return {
    type: SET_IMAGE,
    isFetching: isFetching,
    item
  };
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SET_IMAGE]: (state, action) => ({
    ...state,
    imageData:        {item: action.item, isFetching: action.isFetching}
  })
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {isFetching: false, imageData: defaultImage};
export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
