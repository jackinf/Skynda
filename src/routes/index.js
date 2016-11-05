// We only need to import the modules necessary for initial render
import CoreLayout from "../layouts/CoreLayout/CoreLayout";
import Home from "./Home";
import Details from "./Details";
import About from "./About";
import Examples from "./Examples";
import Admin from "./Admin";
import Login from "./Login";

import CounterRoute from './Counter_todelete'
import {loadTranslations, setLocale, syncTranslationWithStore, i18nReducer} from 'react-redux-i18n';
import {injectReducer} from "../store/reducers";
// import 'react-redux-toastr/src/less/index.less';
import "react-redux-toastr/lib/css/react-redux-toastr.min.css";

/*  Note: Instead of using JSX, we recommend using react-router
 PlainRoute objects to build route definitions.   */

export const createRoutes = (store) => {

  // ========================================================
  // Translation setup
  // ========================================================
  injectReducer(store, {key: "i18n", reducer: i18nReducer});
  syncTranslationWithStore(store);
  store.dispatch(loadTranslations({
    et: require("./../store/translations/et.json"),
    en: require("./../store/translations/en.json")
  }));
  store.dispatch(setLocale('et'));

  return {
    path: "/",
    component: CoreLayout,
    indexRoute: Home(store),
    childRoutes: [
      Details(store),
      About(store),
      CounterRoute(store),
      Examples(store),
      Admin(store),
      Login(store)
    ]
  };

};

/*  Note: childRoutes can be chunked or otherwise loaded programmatically
 using getChildRoutes with the following signature:

 getChildRoutes (location, cb) {
 require.ensure([], (require) => {
 cb(null, [
 // Remove imports!
 require('./Counter').default(store)
 ])
 })
 }

 However, this is not necessary for code-splitting! It simply provides
 an API for async route definitions. Your code splitting should occur
 inside the route `getComponent` function, since it is only invoked
 when the route exists and matches.
 */

export default createRoutes;
