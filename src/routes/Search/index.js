/**
 * Created by jevgenir on 11/8/2016.
 */
import {injectReducer} from "../../store/reducers";

export default (store) => ({
  path : "search",
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      require("../../components/skynda.Search/reducers").defaultInject(store, injectReducer);
      cb(null, require("./Containers/SearchPage.container.js").default);
    }, "search");
  }
});
