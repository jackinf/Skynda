// ------------------------------------
// Constants
// ------------------------------------
export const LOAD_DESCRIPTION = "LOAD_DESCRIPTION";

// ------------------------------------
// Actions
// ------------------------------------
export function loadDescription (value) {
  return {
    type    : LOAD_DESCRIPTION,
    payload : value
  };
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [LOAD_DESCRIPTION] : (state, action) => {
    action.payload = `
      Siia kirjeldus, miks, mida ja kuidas me teeme Siia kirjeldus, miks, mida ja kuidas me teeme
      Siia kirjeldus, miks, mida ja kuidas me teeme Siia kirjeldus, miks, mida ja kuidas me teeme
      Siia kirjeldus, miks, mida ja kuidas me teeme Siia kirjeldus, miks, mida ja kuidas me teeme
    `;
    return action.payload;
  }
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = "";
export default function reducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
