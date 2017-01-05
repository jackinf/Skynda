/**
 * Created by jevgenir on 11/7/2016.
 */
import React from "react";
import {reducer as formReducer} from 'redux-form';
import {injectReducer} from '../../store/reducers';

const REDUX_FORM_KEY = "form";

export function LoginRoute(store) {
  return {
    path: "/login",
    getComponent(ns, cb) {
      require.ensure([], (require) => {
        // injectReducer(store, {key: "auth", reducer: require("./modules/auth.module").default});
        injectReducer(store, {key: REDUX_FORM_KEY, reducer: formReducer});
        cb(null, require("./containers/Login.container").default);
      })
    }
  };
}


export function RegisterRoute(store) {
  return {
    path: "/register",
    getComponent(ns, cb) {
      require.ensure([], (require) => {
        injectReducer(store, {key: REDUX_FORM_KEY, reducer: formReducer});
        cb(null, require("./containers/Register.container").default);
      })
    }
  };
}
