// import Home from "./Home";
import {injectReducer} from "../../store/reducers";
import NProgress from "react-nprogress";

// export default {
//   component: Home
// };
export default (store) => ({
  getComponent(nextState, cb) {
    NProgress.start();
    require.ensure([], (require) => {
      const Home = require("./containers/HomeContainer").default;
      require("../../components/Search/reducers").defaultInject(store, injectReducer);
      NProgress.done();
      cb(null, Home);
    }, "");
  }
});
