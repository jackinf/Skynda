import {injectReducer} from "../../store/reducers";
import NProgress from "react-nprogress";
import {REDUCER_KEY__DETAILS_CHECKOUT_INFO} from "./components/CheckoutPanel/constants/Details.checkout.constants";

export default (store) => ({
  path : "details/(:id)",
  getComponent(nextState, cb) {
    NProgress.start();
    require.ensure([], (require) => {
      const Details = require("./containers/DetailsContainer").default;

      injectReducer(store, {key: REDUCER_KEY__DETAILS_CHECKOUT_INFO, reducer: require("./components/CheckoutPanel/reducers/Details.checkout.reducer.js").default});
      injectReducer(store, {key: "isLoading", reducer: require("./reducers/Details.module.toggle-loading").default});
      injectReducer(store, {key: "carData", reducer: require("./reducers/Details.module.car-data.js").default});

      NProgress.done();
      cb(null, Details);
    }, "details");
  }
});
