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

export const onSliderChange = (value) => ({
  type: "SET_SLIDER_VALUE",
  payload: value
});
