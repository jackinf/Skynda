/**
 * Created by jevgenir on 11/8/2016.
 */
import {injectReducer} from "../../store/reducers";

export default (store) => ({
  path : "search",
  getComponent(nextState, cb) {
    require.ensure([], (require) => {

      const {setValues, onSliderChange, searchBtn, toggleBtn} = require("../Home/reducers");

      injectReducer(store, {key: "isSearching", reducer: searchBtn});
      injectReducer(store, {key: "showAdvancedSearch", reducer: toggleBtn});
      injectReducer(store, {key: "base", reducer: setValues});
      injectReducer(store, {key: "searchValues", reducer: onSliderChange});

      cb(null, require("./SearchPage.container").default);
    }, "search");
  }
});


// export default (store) => ({
//   path: "search",
//   getComponent(ns, cb) {
//     require.ensure([], (require) => {
//       cb(null, require("./SearchPage.container").default);
//     })
//   }
// })
