import {injectReducer} from '../../../../store/reducers';
import { reducer as formReducer } from 'redux-form';
import {REDUX_FORM_KEY, ROUTE_PATH_PARAM_NAME} from "./constants/Car.constant";

export default (store) => ({
  path: `car(/:${ROUTE_PATH_PARAM_NAME})`,
  getComponent(nextState, cb) {
    require.ensure([], (require) => {

      var id = parseInt(nextState.params[ROUTE_PATH_PARAM_NAME]);

      if (!isNaN(id)) {
        const Container = require("./containers/Car.container.js").default;
        injectReducer(store, {key: "initialValues", reducer: require("./reducers/SetCar.reducer.js").default});
        injectReducer(store, {key: "formMode", reducer: require("./reducers/SetFormMode.reducer.js").default});
        injectReducer(store, {key: REDUX_FORM_KEY, reducer: formReducer});
        cb(null, Container);
      } else {
        const Container = require("./containers/Cars.container.js").default;
        injectReducer(store, {key: "carsData", reducer: require("./reducers/SetCars.reducer.js").default});
        cb(null, Container);
      }
    })
  }
})
