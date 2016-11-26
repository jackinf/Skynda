/**
 * Created by jevgenir on 11/26/2016.
 */
import {reducer as formReducer} from "redux-form";
import {injectReducer} from "../../store/reducers";

export default (store) => ({
  path: "/sell-new-car",
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      injectReducer(store, {key: "form", reducer: formReducer});
      injectReducer(store, {key: "sellNewCarInfo", reducer: require("./reducers/SellNewCar.reducer").default});
      injectReducer(store, {key: "classificators", reducer: require("../Admin/routes/Classifiers/Classifiers.module.js").default});

      cb(null, require("./containers/SellNewCar.container.js").default);
    }, "sell-new-car");
  }
})
