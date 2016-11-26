/**
 * Created by jevgenir on 10/26/2016.
 */
import {injectReducer} from '../../../../store/reducers';
import {ROUTE_PARAMS, REDUCER_KEYS} from "./Classifiers.constant";

export default (store) => ({
  path: `classifier`,
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const Container = require("./Classifiers.container.js").default;
      injectReducer(store, {key: REDUCER_KEYS.VEHICLE_MODELS_DATA, reducer: require("./Classifiers.module.js").default});
      cb(null, Container);
    })
  }
})
