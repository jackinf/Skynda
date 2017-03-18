import {injectReducer} from '../../../../../../store/reducers';
import {ROUTE_PARAMS, REDUCER_KEYS} from "../../constants/Vehicles.constant";
import {REDUCER_KEYS as REPORT_REDUCER_KEYS} from "../../../VehicleReports/constants/VehicleReport.constant";
import {REDUCER_KEYS as REVIEW_REDUCER_KEYS} from "../../../VehicleReviews/constants/VehicleReview.constant";
import {VEHICLE_MODEL_REDUCER_KEY} from "../../../VehicleModels/constants/VehicleModel.constant";
import NProgress from "react-nprogress";
import {onEnterAdmin} from "utils/routerUtils";

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
      injectReducer(store, {key: REDUCER_KEYS.VEHICLE_REPORTS_DATA_LIST, reducer: require("../../../VehicleReports/reducers/VehicleReports.reducer").default});
      injectReducer(store, {key: REPORT_REDUCER_KEYS.VEHICLE_REPORT_DATA, reducer: require("../../../VehicleReports/routes/VehicleReport/reducers/VehicleReport.reducer.js").default});

      //FOR VEHICLE REVIEWS
      injectReducer(store, {key: REDUCER_KEYS.VEHICLE_REVIEWS_DATA_LIST, reducer: require("../../../VehicleReviews/reducers/VehicleReviews.reducer").default});
      injectReducer(store, {key: REVIEW_REDUCER_KEYS.VEHICLE_REVIEW_DATA, reducer: require("../../../VehicleReviews/routes/VehicleReview/reducers/VehicleReview.reducer").default});

      //FOR VEHICLE FEATURES
      injectReducer(store, {key: REDUCER_KEYS.FEATURES_DATA_LIST, reducer: require("./reducers/Vehicle.Features.reducer").default});

      cb(null, require("./containers/Vehicle.container.js").default);
      NProgress.done();
    })
  },
  onEnter(nextState, replace) {
    onEnterAdmin(nextState, replace);
  }

})
