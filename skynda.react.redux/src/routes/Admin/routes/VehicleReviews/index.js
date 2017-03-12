import {injectReducer} from '../../../../store/reducers';
import {ROUTE_PARAMS, REDUCER_KEYS} from "./constants/VehicleReview.constant";
import NProgress from "react-nprogress";
import {onEnterAdmin} from "../../../../utils/routerUtils";

export default (store) => ({
  path: `vehicle-reviews(/:${ROUTE_PARAMS.VEHICLE_REVIEW_ID})`,
  getComponent(nextState, cb) {
    NProgress.start();
    require.ensure([], (require) => {
      const Container = require("./containers/VehicleReviews.container.js").default;
      injectReducer(store, {key: REDUCER_KEYS.VEHICLES_REVIEWS_DATA, reducer: require("./reducers/VehicleReviews.reducer.js")});
      NProgress.done();
      cb(null, Container);
    })
  },
  onEnter(nextState, replace) {
    onEnterAdmin(nextState, replace);
  }

})
