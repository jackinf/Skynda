import {injectReducer} from '../../../../store/reducers';
import NProgress from "react-nprogress";
import {setFeaturesList} from "./Features.reducer";
import {REDUCER_KEYS} from "./Features.constant";
import FeatureRoute from "./routes/Feature";

export default (store) => ({
  path: `feature`,
  getComponent(nextState, cb) {
    NProgress.start();
    require.ensure([], (require) => {
      injectReducer(store, {key: REDUCER_KEYS.FEATURES_LIST, reducer: setFeaturesList});
      NProgress.done();
      cb(null, require("./Features.container").default);
    })
  },
  childRoutes: [
    FeatureRoute(store)
  ]
})
