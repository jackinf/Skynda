/**
 * Created by zekar on 3/6/2017.
 */

import {injectReducer} from '../../../../../../store/reducers';
import {ROUTE_PARAMS, VEHICLE_MODEL_REDUCER_KEY} from "./../../constants/VehicleModel.constant";
import NProgress from "react-nprogress";
import {toastr} from 'react-redux-toastr'

export default (store) => ({
  path: `(:${ROUTE_PARAMS.VEHICLE_MODEL_ID})`,
  getComponent(nextState, cb) {
    NProgress.start();
    require.ensure([], (require) => {
      injectReducer(store, {key: VEHICLE_MODEL_REDUCER_KEY, reducer: require("./reducers/VehicleModel.reducer.js").default});
      injectReducer(store, {key: "classificators", reducer: require("./../../../Classifiers/Classifiers.module").default});
      cb(null, require("./containers/VehicleModel.container.js").default);
      NProgress.done();
    }, "vehicleModel")
  },
  onEnter() {
    toastr.clean();
  }
})
