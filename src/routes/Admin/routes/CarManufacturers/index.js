/**
 * Created by jevgenir on 10/26/2016.
 */
import {injectReducer} from '../../../../store/reducers';
import {ROUTE_PARAMS, REDUCER_KEYS} from "./constants/CarManufacturers.constant";

export default (store) => ({
  path: `car-manufacturer(/:${ROUTE_PARAMS.CAR_MANUFACTURER_ID})`,
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const Container = require("./containers/CarManufacturers.container.js").default;
      injectReducer(store, {key: REDUCER_KEYS.CAR_MODELS_DATA, reducer: require("./reducers/CarManufacturers.setData.reducer.js").default});
      cb(null, Container);
    })
  }
})
