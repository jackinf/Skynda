// import Home from "./Home";
import {injectReducer} from "../../store/reducers";

// export default {
//   component: Home
// };
export default (store) => ({
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const Home = require("./containers/HomeContainer").default;

      const {setValues, onSliderChange, searchBtn, toggleBtn} = require("./reducers");

      injectReducer(store, {key: "isSearching", reducer: searchBtn});
      injectReducer(store, {key: "showAdvancedSearch", reducer: toggleBtn});
      injectReducer(store, {key: "base", reducer: setValues});
      injectReducer(store, {key: "searchValues", reducer: onSliderChange});

      cb(null, Home);
    }, "");
  }
});
