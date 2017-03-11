import {injectReducer} from '../../../../store/reducers';
import {REDUCER_KEYS} from "./constants/Vehicles.constant";
import NProgress from "react-nprogress";
import VehicleRoute from "./routes/Vehicle";
import {onEnterAdmin} from "utils/routerUtils";

export default (store) => ({
  path: `vehicle`,
  getComponent(nextState, cb) {
    NProgress.start();
    require.ensure([], (require) => {
      injectReducer(store, {key: REDUCER_KEYS.VEHICLES_DATA, reducer: require("./reducers/Vehicles.reducer.js").default});
      cb(null, require("./containers/Vehicles.container.js").default);
      NProgress.done();
    })
  },
  childRoutes: [
    VehicleRoute(store)
  ],
  onEnter(nextState, replace) {
    onEnterAdmin(nextState, replace);
  }

})
