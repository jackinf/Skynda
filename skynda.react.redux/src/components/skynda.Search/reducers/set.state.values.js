import ACTIONS from '../actions/constants';

export const setIsSearching = (state = false, action) => {
  switch (action.type) {
    case ACTIONS.SET_IS_SEARCHING:
      return action.value;

    default:
      return state;
  }
};

export const toggleAdvanced = (state = false, action) => {
  switch (action.type) {
    case ACTIONS.TOGGLE_ADVANCED_SEARCH:
      return !action.value;

    default:
      return state;
  }
};

export const setBaseValues = (state = [], action) => {
  switch (action.type) {
    case ACTIONS.SET_BASE_VALUES:
      const newState = {...state};

      newState[action.payload.sliderValues.key] = action.payload.sliderValues.value;
      newState[action.payload.models.key] = action.payload.models.value;
      newState[action.payload.brands.key] = action.payload.brands.value;
      newState[action.payload.features.key] = action.payload.features.value;
      newState[action.payload.fuels.key] = action.payload.fuels.value;
      newState[action.payload.transmissions.key] = action.payload.transmissions.value;
      newState[action.payload.doors.key] = action.payload.doors.value;
      newState[action.payload.seats.key] = action.payload.seats.value;

      return newState;
    default:
      return state;
  }
};

export const setSearchResults = (state = false, action) => {
  switch (action.type) {
    case ACTIONS.SET_SEARCH_RESULTS: {
      return action.payload;
    }
    default:
      return state;
  }
};
