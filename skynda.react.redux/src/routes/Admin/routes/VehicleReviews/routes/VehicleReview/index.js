import {injectReducer} from '../../../../../../store/reducers';
import {ROUTE_PARAMS, FORMS, REDUCER_KEYS} from "./../../constants/VehicleReview.constant";
import NProgress from "react-nprogress";
import {onEnterAdmin} from "../../../../../../utils/routerUtils";

export default (store) => ({
  path: `(/:${ROUTE_PARAMS.VEHICLE_REPORT_ID})`,
  getComponent(nextState, cb) {
    NProgress.start();
    require.ensure([], (require) => {
      injectReducer(store, {key: REDUCER_KEYS.VEHICLE_REPORT_DATA, reducer: require("./reducers/VehicleReview.reducer").default});
      injectReducer(store, {key: REDUCER_KEYS.VEHICLES, reducer: require("./../../../Vehicles/reducers/Vehicles.reducer.js").default});
      cb(null, require("./containers/VehicleReview.container.js").default);
      NProgress.done();
    })
  },
  onEnter(nextState, replace) {
    onEnterAdmin(nextState, replace);
  }
})
