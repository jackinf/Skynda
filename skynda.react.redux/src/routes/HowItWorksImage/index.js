/**
 * Created by ardi-pc on 2017-05-20.
 */
import NProgress from "react-nprogress";
import HowItWorksImage from "./component";

export default (store) => ({
  path : "howitworks",
  getComponent(nextState, cb) {
    NProgress.start();
    require.ensure([], (require) => {
      NProgress.done();
      cb(null, HowItWorksImage);
    }, "howitworks");
  }
});
