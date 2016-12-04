import ACTIONS from '../actions/constants';

export const setIsSubscribed = (state = false, action) => {
  switch (action.type) {
    case ACTIONS.IS_SUBSCRIBED:
      return action.value;

    default:
      return state;
  }
};
