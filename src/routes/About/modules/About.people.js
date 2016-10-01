import image_face_1 from "../assets/face1.png";
import image_face_2 from "../assets/face2.png";
import image_face_3 from "../assets/face3.png";
import image_face_4 from "../assets/face4.png";
import image_face_5 from "../assets/face5.png";
import image_face_6 from "../assets/face6.png";
import image_face_7 from "../assets/face7.png";
import image_face_8 from "../assets/face8.png";

// ------------------------------------
// Constants
// ------------------------------------
export const LOAD_PEOPLE = "LOAD_PEOPLE";

// ------------------------------------
// Actions
// ------------------------------------
export function loadPeople (value) {
  return {
    type    : LOAD_PEOPLE,
    payload : value
  };
}

export const actions = {
  loadPeople
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [LOAD_PEOPLE] : (state, action) => {
    const people = [
      {
        imageUrl: image_face_1,
        name: "Karl Anton",
        position: "Ärijuht"
      },
      {
        imageUrl: image_face_2,
        name: "Tiina Kärsna",
        position: "Turundusjuht"
      },
      {
        imageUrl: image_face_3,
        name: "Jevgeni Rumjantsev",
        position: "Arendaja"
      },
      {
        imageUrl: image_face_4,
        name: "Ardi Aver",
        position: "Arendaja"
      },
      {
        imageUrl: image_face_5,
        name: "Mihhail Marenkov",
        position: "Arendaja"
      },
      {
        imageUrl: image_face_6,
        name: "Tauri Nikkari",
        position: "Arendaja"
      },
      {
        imageUrl: image_face_7,
        name: "Artur Puiste",
        position: "UX Disainer"
      },
      {
        imageUrl: image_face_8,
        name: "Tähtis Nimi",
        position: "Investor"
      }
    ];

    action.payload = people;

    return action.payload;
  }
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = [];
export default function reducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
