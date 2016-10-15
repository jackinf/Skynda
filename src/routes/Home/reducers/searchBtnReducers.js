export const searchBtnReducers = (state = false, action) => {
  switch (action.type) {
    case 'SET_IS_SEARCHING':
      return !action.value;

    case "TOGGLE_ADVANCED_SEARCH":
      return !state.value;

    default:
      return state;
  }
};

export default searchBtnReducers
