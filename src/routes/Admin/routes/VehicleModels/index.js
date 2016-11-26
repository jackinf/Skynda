/**
 * Created by jevgenir on 10/26/2016.
 */
import {injectReducer} from '../../../../store/reducers';
import {ROUTE_PARAMS, REDUCER_KEYS} from "./constants/VehicleModel.constant";

export default (store) => ({
  path: `vehicle-model(/:${ROUTE_PARAMS.VEHICLE_MODEL_ID})`,
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const Container = require("./containers/VehicleModels.container.js").default;
      injectReducer(store, {key: REDUCER_KEYS.VEHICLE_MODELS_DATA, reducer: require("./reducers/VehicleModels.reducer.js").default});
      cb(null, Container);
    })
  }
})
