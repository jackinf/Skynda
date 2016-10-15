export const searchBtn = (state = false, action) => {
  switch (action.type) {
    case 'SET_IS_SEARCHING':
      return !action.value;

    default:
      return state;
  }
};

export const toggleBtn = (state = false, action) => {
  switch (action.type) {
    case "TOGGLE_ADVANCED_SEARCH":
      return !action.value;

    default:
      return state;
  }
};
