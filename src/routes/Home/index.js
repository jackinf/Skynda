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

      const {
        setBaseValues,
        changeSearchValues,
        setIsSearching,
        toggleAdvanced,
        setSearchResults
      } = require("../../components/Search/reducers");

      injectReducer(store, {key: "isSearching", reducer: setIsSearching});
      injectReducer(store, {key: "showAdvancedSearch", reducer: toggleAdvanced});
      injectReducer(store, {key: "base", reducer: setBaseValues});
      injectReducer(store, {key: "searchValues", reducer: changeSearchValues});
      injectReducer(store, {key: "searchResults", reducer: setSearchResults});

      NProgress.done();
      cb(null, Home);
    }, "");
  }
});
