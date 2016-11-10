export const toggleButtonGroupValue = (state = [], action) => {
  switch (action.type) {
    case "TOGGLE_BUTTON_GROUP_VALUE":
      var newState = {...state};

      if(newState[action.payload.type] === undefined){
        newState[action.payload.type] = [];
      }

      var index = newState[action.payload.type].indexOf(action.payload.value);

      if(index === -1){ //NOT FOUND
        newState[action.payload.type] = [...newState[action.payload.type], action.payload.value];
      }else{
        if(!action.payload.isToggled){
          var items = [
            ...newState[action.payload.type].slice(0, index),
            ...newState[action.payload.type].slice(index + 1)
          ];

          var allIndex = items.indexOf(-1);
          if(allIndex !== -1){
            items = [
              ...items.slice(0, allIndex),
              ...items.slice(allIndex + 1)
            ];
          }

          newState[action.payload.type] = items;

        }
      }

      return newState;

    default:
      return state;
  }
};

export default toggleButtonGroupValue;
