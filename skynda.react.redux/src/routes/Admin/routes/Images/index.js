/**
 * Created by jevgenir on 10/26/2016.
 */
import {injectReducer} from '../../../../store/reducers';
import {REDUCER_KEYS} from "./Image.list.constant";
import NProgress from "react-nprogress";
import {onEnterAdmin} from "../../../../utils/routerUtils";

export default (store) => ({
  path: `images`,
  getComponent(nextState, cb) {
    NProgress.start();
    require.ensure([], (require) => {
      injectReducer(store, {key: REDUCER_KEYS.ADMIN_IMAGES, reducer: require("./Image.list.reducer.js").default});
      cb(null, require("./Image.list.container.js").default);
      NProgress.done();
    })
  },
  onEnter(nextState, replace) {
    canEnter(nextState, replace);
  }
})

export const canEnter = onEnterAdmin;
