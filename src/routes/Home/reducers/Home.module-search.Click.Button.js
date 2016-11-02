import ACTIONS from './../actions/constants';

export const searchBtn = (state = false, action) => {
  switch (action.type) {
    case ACTIONS.SET_IS_SEARCHING:
      return !action.value;

    default:
      return state;
  }
};

export const toggleBtn = (state = false, action) => {
  switch (action.type) {
    case ACTIONS.TOGGLE_ADVANCED_SEARCH:
      return !action.value;

    default:
      return state;
  }
};
