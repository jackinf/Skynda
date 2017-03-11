import {injectReducer} from '../../../../store/reducers';
import NProgress from "react-nprogress";
import {onEnterAdmin} from "../../../../utils/routerUtils";

export default (store) => ({
  path: `classifier`,
  getComponent(nextState, cb) {
    NProgress.start();
    require.ensure([], (require) => {
      const Container = require("./Classifiers.container.js").default;
      injectReducer(store, {key: "classificators", reducer: require("./Classifiers.module.js").default});
      NProgress.done();
      cb(null, Container);
    })
  },
  onEnter(nextState, replace) {
    onEnterAdmin(nextState, replace);
  }
})
