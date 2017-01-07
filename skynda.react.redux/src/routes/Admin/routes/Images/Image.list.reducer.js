/**
 * Created by jevgenir on 11/13/2016.
 */
import fetch from "isomorphic-fetch";
import remoteConfig from "store/remoteConfig";

// ------------------------------------
// Actions
// ------------------------------------
const SET_IMAGES = "IMAGE/SET_IMAGES";
const SET_BLOB_IMAGES = "IMAGE/SET_BLOB_IMAGES";
const DEFAULT_CONTAINER_NAME = "skynda";

// ------------------------------------
// Async Action Creators
// ------------------------------------

/**
 * Generic way to get classifiers
 * @param containerName
 * @returns {function(*)}
 */
export function getImages(containerName = DEFAULT_CONTAINER_NAME) {
  return (dispatch) => {
    dispatch(setImages([], true));

    return fetch(`${remoteConfig.remote}/api/image/list?containerName=${containerName}`, {
      method: "GET",
      credentials: "include",
      headers: {"Accept": "application/json", "Content-Type": "application/x-www-form-urlencoded"}
    })
      .then(resp => resp.json())
      .then(resp => {
        console.info("Images response", resp);
        dispatch(setImages(resp, false));
      })
      .catch(err => {
        console.error(err);
        dispatch(setImages([], false));
      });
  };
}
/**
 * Generic way to get classifiers
 * @param containerName
 * @returns {function(*)}
 */
export function getBlobImages(containerName = DEFAULT_CONTAINER_NAME) {
  return (dispatch) => {
    dispatch(setBlobImages([], true));

    return fetch(`${remoteConfig.remote}/api/blob/list?containerName=${containerName}`, {
      method: "GET",
      credentials: "include",
      headers: {"Accept": "application/json", "Content-Type": "application/x-www-form-urlencoded"}
    })
      .then(resp => resp.json())
      .then(resp => {
        console.info("Images response", resp);
        dispatch(setBlobImages(resp, false));
      })
      .catch(err => {
        console.error(err);
        dispatch(setBlobImages([], false));
      });
  };
}

// ------------------------------------
// Action Creators
// ------------------------------------

function setImages(items, isFetching) {
  return {
    type: SET_IMAGES,
    isFetching: isFetching,
    items: items
  };
}

function setBlobImages(items, isFetching) {
  return {
    type: SET_BLOB_IMAGES,
    isFetching: isFetching,
    items: items
  };
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SET_IMAGES]: (state, action) => ({
    ...state,
    imageData:        {items: action.items, isFetching: action.isFetching}
  }),
  [SET_BLOB_IMAGES]: (state, action) => ({
    ...state,
    blobImageData:        {items: action.items, isFetching: action.isFetching}
  })
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {isFetching: false, imageData: [], blobImageData: []};
export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
