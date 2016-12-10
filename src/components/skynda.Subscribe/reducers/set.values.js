import ACTIONS from '../actions/constants';
import {change} from "redux-form";
import {setIsSubscribed} from "../actions";

export const subscribeReducers = (state = false, action) => {
  switch (action.type) {
    case ACTIONS.IS_SUBSCRIBED:
      return action.value;

    default:
      return state;
  }
};

export const onHandleSubmitFinished = (resp) => (dispatch, getState) => {
  if (resp && resp.success && !isNaN(parseInt(resp.id))) {
    dispatch(change("subscribeModelForm", "id", resp.id));
    dispatch(setIsSubscribed(true));
  }
};
