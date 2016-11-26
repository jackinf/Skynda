import {combineReducers} from "redux";
import locationReducer from "./location";
import {reducer as toastrReducer} from 'react-redux-toastr';

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    location: locationReducer,
    toastr: toastrReducer,
    ...asyncReducers,
  });
};

export const injectReducer = (store, {key, reducer}) => {
  store.asyncReducers[key] = reducer;
  store.replaceReducer(makeRootReducer(store.asyncReducers));
};

export default makeRootReducer;
