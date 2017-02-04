import {injectReducer} from '../../../../store/reducers';
import {reducer as formReducer} from 'redux-form';
import {ROUTE_PARAMS, FORMS, REDUCER_KEYS} from "./constants/VehicleReport.constant";
import {setFormMode, setVehicleReportData, setVehicleReports} from "./reducers";
import NProgress from "react-nprogress";

export default (store) => ({
  path: `vehicle-reports(/:${ROUTE_PARAMS.VEHICLE_REPORT_ID})`,
  getComponent(nextState, cb) {
    NProgress.start();
    require.ensure([], (require) => {
      const id = nextState.params[ROUTE_PARAMS.VEHICLE_REPORT_ID];
      const isAdd = id === ROUTE_PARAMS.values.NEW;
      const isUpdate = !isNaN(parseInt(id));

      if (isAdd || isUpdate) {
        console.log("check");
        const Container = require("./containers/VehicleReport.container.js").default;
        injectReducer(store, {key: REDUCER_KEYS.VEHICLE_REPORT_DATA, reducer: setVehicleReportData});
        injectReducer(store, {key: REDUCER_KEYS.FORM_MODE_VEHICLE_REPORT, reducer: setFormMode});
        injectReducer(store, {key: FORMS.DEFAULT_REDUX_FORM_KEY, reducer: formReducer});
        injectReducer(store, {key: REDUCER_KEYS.VEHICLES, reducer: require("./../Vehicles/reducers/Vehicles.list.reducer").default});
        NProgress.done();
        cb(null, Container);
      }
      else {
        const Container = require("./containers/VehicleReports.container.js").default;
        injectReducer(store, {key: REDUCER_KEYS.VEHICLES_REPORTS_DATA, reducer: setVehicleReports});
        NProgress.done();
        cb(null, Container);
      }
    })
  }

})
