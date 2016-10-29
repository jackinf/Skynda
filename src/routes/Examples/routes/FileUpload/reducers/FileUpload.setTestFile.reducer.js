/**
 * Created by jevgenir on 10/29/2016.
 */

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  setTestFile: (state, action) => action.payload
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {};
export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
