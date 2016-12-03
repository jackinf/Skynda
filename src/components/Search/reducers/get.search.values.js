import ACTIONS from '../actions/constants';

const findWithAttr = (array, attr, value) =>{
  for(var i = 0; i < array.length; i++){
    if(array[i][attr] === value){
      return i;
    }
  }
  return -1;
};

export const changeSearchValues = (state = [], action) => {
  switch (action.type) {
    case ACTIONS.TOGGLE_BUTTON_GROUP_VALUE: {
      var newState = {...state};

      if (newState[action.payload.type] === undefined) {
        newState[action.payload.type] = [];
      }

      var index = findWithAttr(newState[action.payload.type], "value", action.payload.value);

      if (index === -1) { //NOT FOUND
        newState[action.payload.type] = [...newState[action.payload.type], action.payload];
      } else {
        if (!action.payload.isToggled) {
          var items = [
            ...newState[action.payload.type].slice(0, index),
            ...newState[action.payload.type].slice(index + 1)
          ];

          var allBtnIndex = findWithAttr(items, "value", -1);
          if (allBtnIndex !== -1) {
            items = [
              ...items.slice(0, allBtnIndex),
              ...items.slice(allBtnIndex + 1)
            ];
          }

          newState[action.payload.type] = items;

        }
      }

      return newState;
    }


    case ACTIONS.SET_SLIDER_VALUE: {
      var newState = {...state};

      if (newState[action.payload.type] === undefined) {
        newState[action.payload.type] = []
      }

      newState[action.payload.type] = {
        type: action.payload.type,
        min: action.payload.value[0],
        max: action.payload.value[1]
      };

      return newState;
    }

    default:
      return state;
  }
};

export default changeSearchValues;
