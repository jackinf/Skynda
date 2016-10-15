// import Home from "./Home";
import {injectReducer} from "../../store/reducers";

// export default {
//   component: Home
// };
export default (store) => ({
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const Home = require("./containers/HomeContainer").default;

      injectReducer(store, {key: "isSearching", reducer: require("./reducers/isSearching").default});

      cb(null, Home);
    }, "");
  }
});
