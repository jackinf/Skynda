// ------------------------------------
// Constants
// ------------------------------------
export const LOAD_DESCRIPTION = "LOAD_DESCRIPTION";

// ------------------------------------
// Actions
// ------------------------------------
export function loadDescription(value) {
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
      Meil kõigil on vaja aega oluliste tegevuste ja inimeste jaoks ning me kõik teame, kui keeruline võib olla seda aega leida. Sellepärast lõimegi Triveni, kus toimetame iga päev selle nimel, et kasutatud auto ost või müük ei nõuaks Sinult liiga palju aega ega pingutust. Meie maailmaparandajate tiim teeb Sinu auto müümise ja ostmise mugavamaks kui eales varem.   
    `;
    return action.payload;
  }
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = "";
export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
