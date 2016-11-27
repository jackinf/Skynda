/**
 * Created by jevgenir on 11/27/2016.
 */
import NProgress from "react-nprogress";

export default (store) => ({
  path : "how-it-works",
  getComponent(nextState, cb) {
    NProgress.start();
    require.ensure([], (require) => {
      NProgress.done();
      cb(null, require("./HowItWorks.component").default);
    }, "how-it-works");
  }
});
