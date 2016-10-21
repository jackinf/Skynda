import {injectReducer} from '../../../../store/reducers';
import { reducer as formReducer } from 'redux-form';
import {REDUX_FORM_KEY} from "./constants/Car.constant";

export default (store) => ({
  path: "car(/:pathParam)",
  getComponent(nextState, cb) {
    require.ensure([], (require) => {

      if (nextState.params.pathParam) {
        injectReducer(store, {key: "carData", reducer: require("./reducers/SetCarData.reducer").default});
        injectReducer(store, {key: REDUX_FORM_KEY, reducer: formReducer});
        cb(null, require("./containers/Car.container.js").default);
      } else {
        const Container = require("./containers/Cars.container.js").default;
        injectReducer(store, {key: "carsData", reducer: require("./reducers/SetCars.reducer.js").default});
        cb(null, Container);
      }
    })
  }
})
