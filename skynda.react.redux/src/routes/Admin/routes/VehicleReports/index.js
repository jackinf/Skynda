import {injectReducer} from '../../../../store/reducers';
import {ROUTE_PARAMS, REDUCER_KEYS} from "./constants/VehicleReport.constant";
import NProgress from "react-nprogress";
import {onEnterAdmin} from "../../../../utils/routerUtils";
import VehicleReportRoute from "./routes/VehicleReport";

export default (store) => ({
  path: `vehicle-reports(/:${ROUTE_PARAMS.VEHICLE_REPORT_ID})`,
  getComponent(nextState, cb) {
    NProgress.start();
    require.ensure([], (require) => {
      injectReducer(store, {key: REDUCER_KEYS.VEHICLES_REPORTS_DATA, reducer: require("./reducers/VehicleReports.reducer").default});
      cb(null, require("./containers/VehicleReports.container.js").default);
      NProgress.done();
    })
  },
  onEnter(nextState, replace) {
    onEnterAdmin(nextState, replace);
  },
  childRoutes: [
    VehicleReportRoute(store)
  ]

})
