export const onSliderChange = (state = [], action) => {
  switch (action.type) {
    case "SET_SLIDER_VALUE":
    {
      console.log("activated slider. Type> ", action.payload.type);
      // console.log("FOUND REDUCER ")
      // console.log("payload ", action.payload)
      // console.log("Old state values ", state)
      // var newState = {...state}

      // const range = {
      //   min: action.payload.value[0],
      //   max: action.payload.value[1],
      //   units: action.payload.units
      // };
      //
      // newState[action.payload.type] = range;
      // console.log("New state values ", newState);

      return action.payload;
    }

    default:
      return state;
  }
};

export default onSliderChange;
