export const setIsSearching = (value) => ({
  type: 'SET_IS_SEARCHING',
  value
});

export const toggleAdvanced = (value) => ({
  type: "TOGGLE_ADVANCED_SEARCH",
  value
});

export const setStateValues = (value) => ({
  type: "SET_STATE_VALUES",
  payload: value
});

export const updateSliderValue = (state , value) => ({
  type: "SET_SLIDER_VALUE",
  payload: value
});

export const toggleButtonGroupValue = (state, value) => ({
  type: "TOGGLE_BUTTON_GROUP_VALUE",
  payload: value
});

export const searchCars = (value) => ({
  type: "SEARCH_CARS",
  payload: value
});
