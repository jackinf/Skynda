import {injectReducer} from '../../../../store/reducers';
import {reducer as formReducer} from 'redux-form';
import {REDUX_FORM_KEY, ROUTE_PATH_PARAM_NAME} from "./constants/Car.constant";

export default (store) => ({
  path: `car(/:${ROUTE_PATH_PARAM_NAME})`,
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const param = nextState.params[ROUTE_PATH_PARAM_NAME];
      if (!isNaN(parseInt(param))) {
        const Container = require("./containers/Car.update.container.js").default;
        injectReducer(store, {key: "initialValues", reducer: require("./reducers/SetCar.reducer.js").default});
        injectReducer(store, {key: "formMode1", reducer: require("./reducers/SetFormMode.reducer.js").default});
        injectReducer(store, {key: REDUX_FORM_KEY, reducer: formReducer});
        cb(null, Container);
      }
      else if (param === "new") {
        const Container = require("./containers/Car.create.container.js").default;
        injectReducer(store, {key: "initialValues", reducer: require("./reducers/SetCar.reducer.js").default});
        injectReducer(store, {key: "formMode1", reducer: require("./reducers/SetFormMode.reducer.js").default});
        injectReducer(store, {key: REDUX_FORM_KEY, reducer: formReducer});
        cb(null, Container);
      }
      else {
        const Container = require("./containers/Cars.container.js").default;
        injectReducer(store, {key: "carsData", reducer: require("./reducers/SetCars.reducer.js").default});
        cb(null, Container);
      }
    })
  }
})
