import image_face_1 from '../assets/face1.png';
import image_face_2 from '../assets/face2.png';
import image_face_3 from '../assets/face3.png';
import image_face_4 from '../assets/face4.png';
import image_face_5 from '../assets/face5.png';
import image_face_6 from '../assets/face6.png';
import image_face_7 from '../assets/face7.png';
import image_face_8 from '../assets/face8.png';

// ------------------------------------
// Constants
// ------------------------------------
export const LOAD_DESCRIPTION = 'LOAD_DESCRIPTION';

// ------------------------------------
// Actions
// ------------------------------------
export function loadDescription (value) {
  return {
    type    : LOAD_DESCRIPTION,
    payload : value
  }
}

export const actions = {
  loadDescription
};

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
  return handler ? handler(state, action) : state
}
