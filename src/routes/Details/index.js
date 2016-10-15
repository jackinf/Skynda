import {injectReducer} from "../../store/reducers";

export default (store) => ({
  path : "details",
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const Details = require("./containers/DetailsContainer").default;
<<<<<<< HEAD
      injectReducer(store, { key: "isLoading", reducer: require("./reducers/Details.module.toggle-loading").default });
      injectReducer(store, { key: "carData", reducer: require("./reducers/Details.module.car-data.js").default });
=======
      injectReducer(store, {key: "isLoading", reducer: require("./reducers/Details.module.toggle-loading").default});
      injectReducer(store, {key: "carData", reducer: require("./reducers/Details.module.car-data.js").default});
>>>>>>> 57f113de15547cac67368c94072cf6508e8943ff
      cb(null, Details);
    }, "details");
  }
});
