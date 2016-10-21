import {injectReducer} from '../../../../store/reducers';

export default (store) => ({
  path: "cars",
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const Container = require("./containers/Cars.container.js").default;
      injectReducer(store, {key: "carsData", reducer: require("./reducers/SetCars.reducer.js").default});
      cb(null, Container);
    })
  }
})
