import {injectReducer} from '../../../../store/reducers';
import {ROUTE_PARAMS, FORM_MODE, REDUCER_KEYS} from "./constants/Vehicle.constant";
import NProgress from "react-nprogress";
import VehicleRoute from "./routes/Vehicle";

export default (store) => ({
  path: `vehicle`,
  getComponent(nextState, cb) {
    NProgress.start();
    require.ensure([], (require) => {
      injectReducer(store, {key: REDUCER_KEYS.VEHICLES_DATA, reducer: require("./reducers/Vehicles.list.reducer.js").default});
      cb(null, require("./containers/Vehicle.list.container.js").default);
      NProgress.done();
    })
  },
  childRoutes: [
    VehicleRoute(store)
  ]

})
