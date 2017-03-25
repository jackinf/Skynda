import {injectReducer} from "../../store/reducers";
import NProgress from "react-nprogress";

export default (store) => ({
  getComponent(nextState, cb) {
    NProgress.start();
    require.ensure([], (require) => {
      require("../../components/skynda.Search/reducers").defaultInject(store, injectReducer);
      injectReducer(store, {key: "subscribeInfo", reducer: require("./components/Subscribe/reducers/Subscribe.reducer").default});
      NProgress.done();
      cb(null, require("./containers/HomeContainer").default);
    }, "");
  }
});
