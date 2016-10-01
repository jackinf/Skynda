import { injectReducer } from "../../store/reducers";

export default (store) => ({
  path : "about",
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Counter = require("./containers/AboutContainer").default;
      const peopleReducer = require("./modules/About.people").default;
      const descriptionReducer = require("./modules/About.description").default;
      injectReducer(store, { key: "people", reducer: peopleReducer });
      injectReducer(store, { key: "description", reducer: descriptionReducer });
      cb(null, Counter);
    }, "about");
  }
});
