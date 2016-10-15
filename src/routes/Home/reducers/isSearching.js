export const isSearching = (state = false, action) => {
  console.log("reducer issearh ", action);
  switch (action.type) {
    case 'SET_IS_SEARCHING':
      return !action.value;
    default:
      return state
  }
};

export default isSearching
