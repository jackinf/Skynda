import {setIsSubscribed} from "./set.values";
import {subscribe} from "./send.email";


export function defaultInject(store, injectReducer) {
  injectReducer(store, {key: "isSubscribed", reducer: setIsSubscribed});
  injectReducer(store, {key: "subscriptionEmail", reducer: subscribe});
}

export {
  setIsSubscribed,
  subscribe
};
