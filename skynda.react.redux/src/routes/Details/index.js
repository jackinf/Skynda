import {injectReducer} from "../../store/reducers";
import NProgress from "react-nprogress";

export default (store) => ({
  path : "details/(:id)",
  getComponent(nextState, cb) {
    NProgress.start();
    require.ensure([], (require) => {
      const Details = require("./containers/DetailsContainer").default;

      injectReducer(store, {key: "checkoutInfo", reducer: require("./components/CheckoutPanel/Details.checkout.reducer").default});
      injectReducer(store, {key: "isLoading", reducer: require("./reducers/Details.module.toggle-loading").default});
      injectReducer(store, {key: "carData", reducer: require("./reducers/Details.module.car-data.js").default});

      NProgress.done();
      cb(null, Details);
    }, "details");
  }
});
