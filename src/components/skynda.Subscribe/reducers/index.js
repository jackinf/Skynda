import {subscribeReducers, onHandleSubmitFinished} from "./set.values";


export function defaultInject(store, injectReducer) {
  injectReducer(store, {key: "isSubscribed", reducer: subscribeReducers});
}

export {
  subscribeReducers,
  onHandleSubmitFinished
};
