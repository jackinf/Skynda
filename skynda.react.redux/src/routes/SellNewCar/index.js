/**
 * Created by jevgenir on 11/26/2016.
 */
import {reducer as formReducer} from "redux-form";
import {injectReducer} from "../../store/reducers";
import NProgress from "react-nprogress";
import ThanksRoute from "./routes/Thanks";

export default (store) => ({
  path: "/sell-new-car",
  getComponent(nextState, cb) {
    NProgress.start();
    require.ensure([], (require) => {
      injectReducer(store, {key: "form", reducer: formReducer});
      injectReducer(store, {key: "sellNewCarInfo", reducer: require("./reducers/SellNewCar.reducer").default});
      injectReducer(store, {key: "classificators", reducer: require("../Admin/routes/Classifiers/Classifiers.module.js").default});
      injectReducer(store, {key: "vehicleModels", reducer: require("../Admin/routes/VehicleModels/reducers/VehicleModels.reducer.js").default});

      NProgress.done();
      cb(null, require("./containers/SellNewCar.container.js").default);
    }, "sell-new-car");
  },
  childRoutes: [ThanksRoute(store)]
})
