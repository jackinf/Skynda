/**
 * Created by jevgenir on 11/27/2016.
 */
export default (store) => ({
  path : "how-it-works",
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require("./HowItWorks.component").default);
    }, "how-it-works");
  }
});
