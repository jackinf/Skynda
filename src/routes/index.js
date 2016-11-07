// We only need to import the modules necessary for initial render
import CoreLayout from "../layouts/CoreLayout/CoreLayout";
import Home from "./Home";
import Details from "./Details";
import About from "./About";
import Examples from "./Examples";
import Admin from "./Admin";
import {LoginRoute, RegisterRoute} from "./Auth";
import CounterRoute from './Counter_todelete'

import {loadTranslations, setLocale, syncTranslationWithStore, i18nReducer} from 'react-redux-i18n';
import {injectReducer} from "../store/reducers";

// Bonus
import {authSetUser} from "./Auth/modules/auth.module";
import constants from "../utils/constants";

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

  // ========================================================
  // Logged in user setup
  // ========================================================
  try {
    const storedUser = JSON.parse(localStorage.getItem(constants.LOCAL_STORAGE_KEYS.SKYNDA_USER));
    console.log(storedUser);
    store.dispatch(authSetUser(storedUser));
  } catch (ex) {}

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
      LoginRoute(store),
      RegisterRoute(store),
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
