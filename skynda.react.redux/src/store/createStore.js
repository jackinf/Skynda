import {applyMiddleware, compose, createStore} from "redux";
import thunk from "redux-thunk";
import {browserHistory} from "react-router";
import makeRootReducer from "./reducers";
import {updateLocation} from "./location";
import RavenMiddleware from "redux-raven-middleware";

const RAVEN_API = "https://26a35ce1acca47edae3789ec628d257e@sentry.io/138096";

export default (initialState = {}) => {
  // ======================================================
  // Middleware Configuration
  // ======================================================

  const middleware = [thunk];
  if (__PROD__) {
    middleware.push(RavenMiddleware(RAVEN_API));
  }

  // ======================================================
  // Store Enhancers
  // ======================================================
  const enhancers = [];
  if (__DEV__) {
    const devToolsExtension = window.devToolsExtension;
    if (typeof devToolsExtension === "function") {
      enhancers.push(devToolsExtension());
    }
  }

  // ======================================================
  // Store Instantiation and HMR Setup
  // ======================================================
  const store = createStore(
    makeRootReducer(),
    initialState,
    compose(
      applyMiddleware(...middleware),
      ...enhancers
    )
  );
  store.asyncReducers = {};

  // To unsubscribe, invoke `store.unsubscribeHistory()` anytime
  store.unsubscribeHistory = browserHistory.listen(updateLocation(store));

  if (module.hot) {
    module.hot.accept("./reducers", () => {
      const reducers = require("./reducers").default;
      store.replaceReducer(reducers(store.asyncReducers));
    });
  }

  return store;
};
