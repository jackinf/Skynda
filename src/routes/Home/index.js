// import Home from "./Home";
import {injectReducer} from "../../store/reducers";

// export default {
//   component: Home
// };
export default (store) => ({
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const Home = require("./containers/HomeContainer").default;

      const {setValues, updateSliderValue, searchBtn,
        toggleBtn, toggleButtonGroupValue, searchCars} = require("./reducers");

      injectReducer(store, {key: "isSearching", reducer: searchBtn});
      injectReducer(store, {key: "showAdvancedSearch", reducer: toggleBtn});
      injectReducer(store, {key: "base", reducer: setValues});
      injectReducer(store, {key: "sliderValues", reducer: updateSliderValue});
      injectReducer(store, {key: "buttonGroupValues", reducer: toggleButtonGroupValue});
      injectReducer(store, {key: "searchResults", reducer: searchCars});

      cb(null, Home);
    }, "");
  }
});
