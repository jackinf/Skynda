import ACTIONS from "./../actions/constants";

export const setBaseValues = (state = [], action) => {
  switch (action.type) {
    case ACTIONS.SET_BASE_VALUES:
      var newState = {...state};

      newState[action.payload.sliderValues.key] = action.payload.sliderValues.value;
      newState[action.payload.brands.key] = action.payload.brands.value;
      newState[action.payload.features.key] = action.payload.features.value;
      newState[action.payload.transmissions.key] = action.payload.transmissions.value;
      newState[action.payload.doors.key] = action.payload.doors.value;
      newState[action.payload.seats.key] = action.payload.seats.value;

      return {
        ...newState
      };

    default:
      return state;
  }
};

export default setBaseValues;
