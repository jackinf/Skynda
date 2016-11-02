// import Home from "./Home";
import {injectReducer} from "../../store/reducers";

// export default {
//   component: Home
// };
export default (store) => ({
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const Home = require("./containers/HomeContainer").default;

      const {setBaseValues, changeSearchValues, setIsSearching, toggleAdvanced} = require("./reducers");

      injectReducer(store, {key: "isSearching", reducer: setIsSearching});
      injectReducer(store, {key: "showAdvancedSearch", reducer: toggleAdvanced});
      injectReducer(store, {key: "base", reducer: setBaseValues});
      injectReducer(store, {key: "searchValues", reducer: changeSearchValues});

      cb(null, Home);
    }, "");
  }
});
