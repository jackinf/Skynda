import {injectReducer} from '../../../../store/reducers';
import {reducer as formReducer} from 'redux-form';
import {ROUTE_PARAMS, FORM_MODE, FORMS, REDUCER_KEYS} from "./constants/Vehicle.constant";
import {setFormMode} from "./reducers/SetFormMode.reducer";

export default (store) => ({
  path: `vehicle(/:${ROUTE_PARAMS.VEHICLE_ID})`,
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const param = nextState.params[ROUTE_PARAMS.VEHICLE_ID];
      const isAdd = param === ROUTE_PARAMS.values.NEW;
      const isUpdate = !isNaN(parseInt(param));

      if (isAdd || isUpdate) {
        const Container = require("./containers/Vehicle.container.js").default;
        injectReducer(store, {key: REDUCER_KEYS.VEHICLE_DATA, reducer: require("./reducers/SetVehicle.reducer.js").default});
        injectReducer(store, {key: REDUCER_KEYS.FORM_MODE, reducer: require("./reducers/SetFormMode.reducer.js").default});
        injectReducer(store, {key: FORMS.DEFAULT_REDUX_FORM_KEY, reducer: formReducer});
        injectReducer(store, {key: REDUCER_KEYS.VEHICLE_MODELS_DATA, reducer: require("./../VehicleModels/reducers/VehicleModels.reducer.js").default});
        injectReducer(store, {key: "classificators", reducer: require("./../Classifiers/Classifiers.module").default});

        store.dispatch(setFormMode(isUpdate ? FORM_MODE.UPDATING : FORM_MODE.ADDING));
        cb(null, Container);
      }
      else {
        const Container = require("./containers/Vehicles.container.js").default;
        injectReducer(store, {key: REDUCER_KEYS.VEHICLES_DATA, reducer: require("./reducers/SetVehicles.reducer.js").default});
        cb(null, Container);
      }
    })
  }

})
