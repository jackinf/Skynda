import {injectReducer} from '../../../../../../store/reducers';
import {ROUTE_PARAMS, REDUCER_KEYS} from "../../constants/Vehicles.constant";
import {REDUCER_KEYS as REPORT_REDUCER_KEYS} from "../../../VehicleReports/constants/VehicleReport.constant";
import {REDUCER_KEYS as REVIEW_REDUCER_KEYS} from "../../../VehicleReviews/constants/VehicleReview.constant";
import {VEHICLE_MODEL_REDUCER_KEY} from "../../../VehicleModels/constants/VehicleModel.constant";
import {setVehicleReportData, setFormMode as setFormModeReport} from "../../../VehicleReports/reducers";
import {setVehicleReviewData, setFormMode as setFormModeReview} from "../../../VehicleReviews/reducers";
import NProgress from "react-nprogress";

export default (store) => ({
  path: `:${ROUTE_PARAMS.VEHICLE_ID}`,
  getComponent(nextState, cb) {
    NProgress.start();
    require.ensure([], (require) => {
      injectReducer(store, {key: REDUCER_KEYS.VEHICLE_DATA, reducer: require("./reducers/Vehicle.reducer.js").default});
      injectReducer(store, {key: "classificators", reducer: require("./../../../Classifiers/Classifiers.module").default}); // TODO: Use constant
      injectReducer(store, {key: VEHICLE_MODEL_REDUCER_KEY, reducer: require("./../../../VehicleModels/routes/VehicleModel/reducers/VehicleModel.reducer.js").default});

      injectReducer(store, {key: REDUCER_KEYS.VEHICLE_MODELS_DATA, reducer: require("./../../../VehicleModels/reducers/VehicleModels.reducer.js").default});

      //FOR VEHICLE REPORTS
      injectReducer(store, {key: REDUCER_KEYS.VEHICLE_REPORTS_DATA_LIST, reducer: require("./reducers/Vehicle.Reports.reducer")});
      injectReducer(store, {key: REPORT_REDUCER_KEYS.VEHICLE_REPORT_DATA, reducer: setVehicleReportData});
      injectReducer(store, {key: REPORT_REDUCER_KEYS.FORM_MODE_VEHICLE_REPORT, reducer: setFormModeReport});

      //FOR VEHICLE REVIEWS
      injectReducer(store, {key: REDUCER_KEYS.VEHICLE_REVIEWS_DATA_LIST, reducer: require("./reducers/Vehicle.Reviews.reducer")});
      injectReducer(store, {key: REVIEW_REDUCER_KEYS.VEHICLE_REVIEW_DATA, reducer: setVehicleReviewData});
      injectReducer(store, {key: REVIEW_REDUCER_KEYS.FORM_MODE_VEHICLE_REVIEW, reducer: setFormModeReview});

      //FOR VEHICLE FEATURES
      injectReducer(store, {key: REDUCER_KEYS.FEATURES_DATA_LIST, reducer: require("./reducers/Vehicle.Features.reducer")});

      cb(null, require("./containers/Vehicle.container.js").default);
      NProgress.done();
    })
  }

})
