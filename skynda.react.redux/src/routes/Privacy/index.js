/**
 * Created by zekar on 1/25/2017.
 */

import NProgress from "react-nprogress";

export default (store) => ({
  path: "/privacy",
  getComponent(nextState, cb) {
    NProgress.start();
    require.ensure([], (require) => {
      NProgress.done();
      cb(null, require("./Privacy.component.js").default);
    }, "sell-new-car");
  }
})
