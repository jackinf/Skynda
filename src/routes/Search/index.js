/**
 * Created by jevgenir on 11/8/2016.
 */
import {injectReducer} from "../../store/reducers";

export default (store) => ({
  path : "search",
  getComponent(nextState, cb) {
    require.ensure([], (require) => {

      const {
        setIsSearching,
        toggleAdvanced,
        setBaseValues,
        changeSearchValues
      } = require("../../components/Search/reducers");

      injectReducer(store, {key: "isSearching", reducer: setIsSearching});
      injectReducer(store, {key: "showAdvancedSearch", reducer: toggleAdvanced});
      injectReducer(store, {key: "base", reducer: setBaseValues});
      injectReducer(store, {key: "searchValues", reducer: changeSearchValues});

      cb(null, require("./Containers/SearchPage.container.js").default);
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
