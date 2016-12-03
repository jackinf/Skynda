/**
 * Created by jevgenir on 10/26/2016.
 */
import {injectReducer} from '../../../../store/reducers';
import {ROUTE_PARAMS, REDUCER_KEYS} from "./Classifiers.constant";
import NProgress from "react-nprogress";

export default (store) => ({
  path: `classifier`,
  getComponent(nextState, cb) {
    NProgress.start();
    require.ensure([], (require) => {
      const Container = require("./Classifiers.container.js").default;
      injectReducer(store, {key: "classificators", reducer: require("./Classifiers.module.js").default});
      NProgress.done();
      cb(null, Container);
    })
  }
})
