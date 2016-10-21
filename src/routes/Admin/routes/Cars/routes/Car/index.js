/**
 * Created by jevgenir on 10/21/2016.
 */
import {injectReducer} from '../../../../../../store/reducers';
import { reducer as formReducer } from 'redux-form';
import {REDUX_FORM_KEY} from "./constants/Car.constant";

export default (store) => ({
  path: "car/{id}",
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      injectReducer(store, {key: "carData", reducer: require("./reducers/SetCarData.reducer")});
      injectReducer(store, {key: REDUX_FORM_KEY, reducer: formReducer});
      cb(null, require("./containers/Car.container.js").default);
    })
  }
})
