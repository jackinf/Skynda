/**
 * Created by jevgenir on 12/11/2016.
 */
import {injectReducer} from "../../../../store/reducers";

export default (store) => ({
  path: "pipedrive",
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      injectReducer(store, {key: "pipedrive", reducer: require("./reducers/Pipedrive.reducer.js").default});
      cb(null, require("./container/PipedriveDisplay.container").default);
    })
  }
})
