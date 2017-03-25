import {injectReducer} from '../../../../store/reducers';
import {ROUTE_PARAMS, REDUCER_KEYS, FORM_MODE, VEHICLE_MODEL_REDUCER_KEY} from "./constants/VehicleModel.constant";
import NProgress from "react-nprogress";
import VehicleModelRoute from "./routes/VehicleModel";
import {onEnterAdmin} from "../../../../utils/routerUtils";

export default (store) => ({
  path: "vehicle-model",
  getComponent(nextState, cb) {
    NProgress.start();
    require.ensure([], (require) => {
      injectReducer(store, {key: REDUCER_KEYS.VEHICLE_MODELS_DATA, reducer: require("./reducers/VehicleModels.reducer.js").default});
      cb(null, require("./containers/VehicleModels.container.js").default);
      NProgress.done();
    }, "vehicleModels")
  },
  childRoutes: [
    VehicleModelRoute(store)
  ],
  onEnter(nextState, replace) {
    canEnter(nextState, replace);
  }
})

export const canEnter = onEnterAdmin;
