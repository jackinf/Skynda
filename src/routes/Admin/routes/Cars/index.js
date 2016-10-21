import {injectReducer} from '../../../../store/reducers';
import CarRoute from "./routes/Car";

export default (store) => ({
  path: "cars",
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      injectReducer(store, {key: "cars", reducer: require("./reducers/SetCars.reducer.js")});
      cb(null, require("./containers/Cars.container.js").default);
    })
  },
  childRoutes: [
    CarRoute(store)
  ]
})
