import imageFace1 from "../assets/group-124@2x.png.png";
import imageFace2 from "../assets/group-1@2x.png.png";
import imageFace3 from "../assets/group-2@2x.png.png";
import imageFace4 from "../assets/group-3@2x.png.png";
import imageFace5 from "../assets/group-4@2x.png.png";
import imageFace6 from "../assets/group-5@2x.png.png";
import imageFace7 from "../assets/group-6@2x.png.png";
import imageFace8 from "../assets/face8.png";

// ------------------------------------
// Constants
// ------------------------------------
export const LOAD_PEOPLE = "LOAD_PEOPLE";

// ------------------------------------
// Actions
// ------------------------------------
export function loadPeople(value) {
  return {
    type: LOAD_PEOPLE,
    payload: value
  };
}

export const actions = {loadPeople};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [LOAD_PEOPLE]: (state, action) => {
    const people = [
      {
        imageUrl: imageFace1,
        name: "Karl Anton",
        position: "Ärijuht"
      },
      {
        imageUrl: imageFace2,
        name: "Tiina Kärsna",
        position: "Turundusjuht"
      },
      {
        imageUrl: imageFace3,
        name: "Jevgeni Rumjantsev",
        position: "Arendaja"
      },
      {
        imageUrl: imageFace4,
        name: "Ardi Aver",
        position: "Arendaja"
      },
      {
        imageUrl: imageFace5,
        name: "Mihhail Marenkov",
        position: "Arendaja"
      },
      {
        imageUrl: imageFace6,
        name: "Tauri Nikkari",
        position: "Arendaja"
      },
      {
        imageUrl: imageFace7,
        name: "Artur Puiste",
        position: "UX Disainer"
      },
      {
        imageUrl: imageFace8,
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
export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
