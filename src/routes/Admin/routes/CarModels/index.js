/**
 * Created by jevgenir on 10/26/2016.
 */
import {injectReducer} from '../../../../store/reducers';
import {ROUTE_PARAMS, REDUCER_KEYS} from "./constants/CarModel.constant";

export default (store) => ({
  path: `car-model(/:${ROUTE_PARAMS.CAR_MODEL_ID})`,
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const Container = require("./containers/CarModels.container.js").default;
      injectReducer(store, {key: REDUCER_KEYS.CAR_MODELS_DATA, reducer: require("./reducers/CarModels.setData.reducer.js").default});
      cb(null, Container);
    })
  }
})
