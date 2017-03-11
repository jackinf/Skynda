import {injectReducer} from '../../../../store/reducers';
import {reducer as formReducer} from 'redux-form';
import {ROUTE_PARAMS, FORMS, REDUCER_KEYS} from "./constants/VehicleReview.constant";
import NProgress from "react-nprogress";
import {setFormMode, setVehicleReviewData, setVehicleReviews} from "./reducers";
import {onEnterAdmin} from "../../../../utils/routerUtils";

export default (store) => ({
  path: `vehicle-reviews(/:${ROUTE_PARAMS.VEHICLE_REVIEW_ID})`,
  getComponent(nextState, cb) {
    NProgress.start();
    require.ensure([], (require) => {
      const param = nextState.params[ROUTE_PARAMS.VEHICLE_REVIEW_ID];
      const isAdd = param === ROUTE_PARAMS.values.NEW;
      const isUpdate = !isNaN(parseInt(param));

      if (isAdd || isUpdate) {
        const Container = require("./containers/VehicleReview.container.js").default;
        injectReducer(store, {key: REDUCER_KEYS.VEHICLE_REVIEW_DATA, reducer: setVehicleReviewData});
        injectReducer(store, {key: REDUCER_KEYS.FORM_MODE_VEHICLE_REVIEW, reducer: setFormMode});
        injectReducer(store, {key: FORMS.DEFAULT_REDUX_FORM_KEY, reducer: formReducer});
        injectReducer(store, {key: REDUCER_KEYS.VEHICLES_REVIEW, reducer: require("./../Vehicles/reducers/Vehicles.reducer.js").default});
        NProgress.done();
        cb(null, Container);
      }
      else {
        const Container = require("./containers/VehicleReviews.container.js").default;
        injectReducer(store, {key: REDUCER_KEYS.VEHICLES_REVIEWS_DATA, reducer: setVehicleReviews});
        NProgress.done();
        cb(null, Container);
      }
    })
  },
  onEnter(nextState, replace) {
    onEnterAdmin(nextState, replace);
  }

})
