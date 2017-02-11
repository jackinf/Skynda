import {injectReducer} from '../../../../../../store/reducers';
import {ROUTE_PARAMS, REDUCER_KEYS, FORMS} from "./Feature.constant";
import {setFormMode, setFeatureData} from "./Feature.reducer";
import NProgress from "react-nprogress";
import {reducer as formReducer} from 'redux-form';

export default (store) => ({
  path: `:${ROUTE_PARAMS.FEATURE_ID}`,
  getComponent(nextState, cb) {
    NProgress.start();
    require.ensure([], (require) => {
      injectReducer(store, {key: REDUCER_KEYS.FEATURE_DATA, reducer: setFeatureData});
      injectReducer(store, {key: REDUCER_KEYS.FEATURE_FORM_MODE, reducer: setFormMode});
      injectReducer(store, {key: FORMS.DEFAULT_REDUX_FORM_KEY, reducer: formReducer});

      cb(null, require("./Feature.container.js").default);
      NProgress.done();
    })
  }

})
