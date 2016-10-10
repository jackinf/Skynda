import {injectReducer} from "../../store/reducers";

export default (store) => ({
  path : "details",
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const Details = require("./containers/DetailsContainer").default;
      injectReducer(store, {key: "isLoading", reducer: require("./modules/Details.module.toggle-loading").default});
      injectReducer(store, {key: "carData", reducer: require("./modules/Details.module.car-data.js").default});
      cb(null, Details);
    }, "details");
  }
});
