import {injectReducer} from '../../../../store/reducers';
import {reducer as formReducer} from 'redux-form';
import {ROUTE_PARAMS, FORM_MODE, FORMS, REDUCER_KEYS} from "./constants/Car.constant";
import {setFormMode} from "./actions/Car";

export default (store) => ({
  path: `car(/:${ROUTE_PARAMS.CAR_ID})`,
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const param = nextState.params[ROUTE_PARAMS.CAR_ID];
      const isAdd = param === ROUTE_PARAMS.values.NEW;
      const isUpdate = !isNaN(parseInt(param));

      if (isAdd || isUpdate) {
        const Container = require("./containers/Car.container.js").default;
        injectReducer(store, {key: REDUCER_KEYS.CAR_DATA, reducer: require("./reducers/SetCar.reducer.js").default});
        injectReducer(store, {key: REDUCER_KEYS.FORM_MODE, reducer: require("./reducers/SetFormMode.reducer.js").default});
        injectReducer(store, {key: FORMS.DEFAULT_REDUX_FORM_KEY, reducer: formReducer});

        store.dispatch(setFormMode(isUpdate ? FORM_MODE.UPDATING : FORM_MODE.ADDING));
        cb(null, Container);
      }
      else {
        const Container = require("./containers/Cars.container.js").default;
        injectReducer(store, {key: REDUCER_KEYS.CARS_DATA, reducer: require("./reducers/SetCars.reducer.js").default});
        cb(null, Container);
      }
    })
  }
})
