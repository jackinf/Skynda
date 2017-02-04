import {ACTIONS, FORM_MODE} from "../constants/VehicleReview.constant";

export const setFormMode = (value) => ({
  type: ACTIONS.SET_FORM_MODE_REVIEW,
  payload: value
});

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [ACTIONS.SET_FORM_MODE_REVIEW]: (state, action) => action.payload
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = FORM_MODE.READING_REVIEW;
export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
