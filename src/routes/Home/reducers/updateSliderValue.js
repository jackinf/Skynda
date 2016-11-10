export const updateSliderValue = (state = [], action) => {
  switch (action.type) {
    case "SET_SLIDER_VALUE":
    {
      var newState = {...state};

      if(newState[action.payload.type] === undefined){
        newState[action.payload.type] = []
      }

      newState[action.payload.type] = { min: action.payload.value[0], max: action.payload.value[1]};

      return newState;
    }

    default:
      return state;
  }
};

export default updateSliderValue;
