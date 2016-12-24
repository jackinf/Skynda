// ------------------------------------
// Actions
// ------------------------------------
const IS_SUBSCRIBED = "IS_SUBSCRIBED";
const IS_SUBSCRIBE_DIALOG_CLOSED = "IS_SUBSCRIBE_DIALOG_CLOSED";

// ------------------------------------
// Async Actions Creators
// ------------------------------------
export const onHandleSubmitFinished = (resp) => (dispatch) => {
  console.info(onHandleSubmitFinished, resp);
  resp && resp.success && dispatch(setIsSubscribed(true, true));
};

// ------------------------------------
// Actions Creators
// ------------------------------------
export const setIsSubscribed = (isSubscribed) => ({
  type: IS_SUBSCRIBED,
  isSubscribed
});

export const onHandleDialogClose = () => ({
  type: IS_SUBSCRIBE_DIALOG_CLOSED,
  isSubscribed: false
});

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {isSubscribed: false, showPopup: false};
export const subscribeReducers = (state = initialState, action) => {
  switch (action.type) {
    case IS_SUBSCRIBED:
    case IS_SUBSCRIBE_DIALOG_CLOSED:
      return {isSubscribed: action.isSubscribed};
    default:
      return state;
  }
};
