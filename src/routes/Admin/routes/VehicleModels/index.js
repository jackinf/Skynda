/**
 * Created by jevgenir on 10/26/2016.
 */
import {injectReducer} from '../../../../store/reducers';
import {reducer as formReducer} from 'redux-form';
import {ROUTE_PARAMS, REDUCER_KEYS, FORM_MODE} from "./constants/VehicleModel.constant";
import NProgress from "react-nprogress";

export default (store) => ({
  path: `vehicle-model(/:${ROUTE_PARAMS.VEHICLE_MODEL_ID})`,
  getComponent(nextState, cb) {
    NProgress.start();
    require.ensure([], (require) => {
      const id = nextState.params[ROUTE_PARAMS.VEHICLE_MODEL_ID];
      const formMode = id === ROUTE_PARAMS.values.NEW
        ? FORM_MODE.ADDING : !isNaN(parseInt(id))
        ? FORM_MODE.UPDATING : FORM_MODE.NONE;

      if (formMode == FORM_MODE.ADDING || formMode == FORM_MODE.UPDATING) {
        injectReducer(store, {key: "form", reducer: formReducer});
        injectReducer(store, {key: "vehicleModelInfo", reducer: require("./reducers/VehicleModel.reducer.js").default});
        injectReducer(store, {key: "classificators", reducer: require("./../Classifiers/Classifiers.module").default});
        cb(null, require("./containers/VehicleModel.container.js").default);
        store.dispatch(require("./reducers/VehicleModel.reducer.js").load(formMode, id));
        NProgress.done();
      } else {
        injectReducer(store, {key: REDUCER_KEYS.VEHICLE_MODELS_DATA, reducer: require("./reducers/VehicleModels.reducer.js").default});
        cb(null, require("./containers/VehicleModels.container.js").default);
        NProgress.done();
      }

    })
  }
})
