/**
 * Created by jevgenir on 10/1/2016.
 */

export const TOGGLE_LOADING = "TOGGLE_LOADING";

export function toggleLoading (value) {
  return {
    type    : TOGGLE_LOADING,
    payload : value
  };
}

export const actions = {
  toggleLoading
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [TOGGLE_LOADING] : (state, action) => action.payload
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = true;
export default function reducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
