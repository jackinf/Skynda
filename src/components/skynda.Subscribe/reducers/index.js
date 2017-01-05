import {subscribeReducers, onHandleSubmitFinished, onHandleDialogClose} from "./Subscribe.reducer";

export function defaultInject(store, injectReducer) {
  injectReducer(store, {key: "subscribeInfo", reducer: subscribeReducers});
}

export {
  subscribeReducers,
  onHandleSubmitFinished,
  onHandleDialogClose
};
