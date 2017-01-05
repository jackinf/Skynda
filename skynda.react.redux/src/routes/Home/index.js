import {injectReducer} from "../../store/reducers";
import NProgress from "react-nprogress";

export default (store) => ({
  getComponent(nextState, cb) {
    NProgress.start();
    require.ensure([], (require) => {
      const Home = require("./containers/HomeContainer").default;
      require("../../components/skynda.Search/reducers").defaultInject(store, injectReducer);
      require("../../components/skynda.Subscribe/reducers").defaultInject(store, injectReducer);
      NProgress.done();
      cb(null, Home);
    }, "");
  }
});
