import {ImageService, BlobService} from "../../../../webServices"

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
    const promise = ImageService.getImagesInContainer(containerName);
    promise.then(resp => {
      dispatch(setImages(resp, false));
    }).catch(err => {
      dispatch(setImages([], false));
      throw err;
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
    const promise = BlobService.getBlobsInContainer(containerName);
    promise.then(resp => {
      dispatch(setBlobImages(resp, false));
    }).catch(err => {
      dispatch(setBlobImages([], false));
      throw err;
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
    imageData: {items: action.items, isFetching: action.isFetching}
  }),
  [SET_BLOB_IMAGES]: (state, action) => ({
    ...state,
    blobImageData: {items: action.items, isFetching: action.isFetching}
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
