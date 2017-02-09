import {injectReducer} from '../../../../store/reducers';
import {ROUTE_PARAMS, FORM_MODE, REDUCER_KEYS} from "./constants/Vehicle.constant";
import {REDUCER_KEYS as REPORT_REDUCER_KEYS} from "../VehicleReports/constants/VehicleReport.constant";
import {REDUCER_KEYS as REVIEW_REDUCER_KEYS} from "../VehicleReviews/constants/VehicleReview.constant";
import {setVehicleReportData, setFormMode as setFormModeReport} from "../VehicleReports/reducers";
import {setVehicleReviewData, setFormMode as setFormModeReview} from "../VehicleReviews/reducers";
import {setVehicleReportsList} from "./reducers/Vehicle.Reports.reducer";
import {setVehicleReviewsList} from "./reducers/Vehicle.Reviews.reducer";
import NProgress from "react-nprogress";


export default (store) => ({
  path: `vehicle(/:${ROUTE_PARAMS.VEHICLE_ID})`,
  getComponent(nextState, cb) {
    NProgress.start();
    require.ensure([], (require) => {
      const id = nextState.params[ROUTE_PARAMS.VEHICLE_ID];
      const formMode = id === ROUTE_PARAMS.values.NEW
        ? FORM_MODE.ADDING : !isNaN(parseInt(id))
        ? FORM_MODE.UPDATING : FORM_MODE.NONE;

      if (formMode == FORM_MODE.ADDING || formMode == FORM_MODE.UPDATING) {
        injectReducer(store, {key: REDUCER_KEYS.VEHICLE_DATA, reducer: require("./reducers/Vehicle.reducer.js").default});
        injectReducer(store, {key: "classificators", reducer: require("./../Classifiers/Classifiers.module").default});
        injectReducer(store, {key: "formInfo", reducer: require("./../VehicleModels/reducers/VehicleModel.reducer.js").default});

        injectReducer(store, {key: REDUCER_KEYS.VEHICLE_MODELS_DATA, reducer: require("./../VehicleModels/reducers/VehicleModels.reducer.js").default});

        //FOR VEHICLE REPORTS
        injectReducer(store, {key: REDUCER_KEYS.VEHICLE_REPORTS_DATA_LIST, reducer: setVehicleReportsList});
        injectReducer(store, {key: REPORT_REDUCER_KEYS.VEHICLE_REPORT_DATA, reducer: setVehicleReportData});
        injectReducer(store, {key: REPORT_REDUCER_KEYS.FORM_MODE_VEHICLE_REPORT, reducer: setFormModeReport});

        //FOR VEHICLE REVIEWS
        injectReducer(store, {key: REDUCER_KEYS.VEHICLE_REVIEWS_DATA_LIST, reducer: setVehicleReviewsList});
        injectReducer(store, {key: REVIEW_REDUCER_KEYS.VEHICLE_REVIEW_DATA, reducer: setVehicleReviewData});
        injectReducer(store, {key: REVIEW_REDUCER_KEYS.FORM_MODE_VEHICLE_REVIEW, reducer: setFormModeReview});

        cb(null, require("./containers/Vehicle.container.js").default);
        NProgress.done();
      }
      else {
        injectReducer(store, {key: REDUCER_KEYS.VEHICLES_DATA, reducer: require("./reducers/Vehicles.list.reducer.js").default});
        cb(null, require("./containers/Vehicle.list.container.js").default);
        NProgress.done();
      }
    })
  }

})
