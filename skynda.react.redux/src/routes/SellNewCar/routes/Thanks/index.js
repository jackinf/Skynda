/**
 * Created by jevgenir on 3/25/2017.
 */

import NProgress from "react-nprogress";

export default (store) => ({
  path: "thanks",
  getComponent(nextState, cb) {
    NProgress.start();
    require.ensure([], (require) => {
      NProgress.done();
      cb(null, require("./components/Thanks.component.jsx").default);
    }, "sell-new-car-thanks");
  }
})
