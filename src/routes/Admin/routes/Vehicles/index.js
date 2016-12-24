/**
 * Created by jevgenir on 10/26/2016.
 */
import {injectReducer} from '../../../../store/reducers';
import {ROUTE_PARAMS, FORM_MODE, REDUCER_KEYS} from "./constants/Vehicle.constant";
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
        injectReducer(store, {key: REDUCER_KEYS.VEHICLE_MODELS_DATA, reducer: require("./../VehicleModels/reducers/VehicleModels.reducer.js").default});
        injectReducer(store, {key: "classificators", reducer: require("./../Classifiers/Classifiers.module").default});
        injectReducer(store, {key: "formInfo", reducer: require("./../VehicleModels/reducers/VehicleModel.reducer.js").default});

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
