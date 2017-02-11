// We only need to import the modules necessary for initial render
import CoreLayout from "../layouts/CoreLayout/CoreLayout";
import Home from "./Home";
import Search from "./Search";
import Details from "./Details";
import About from "./About";
import HowItWorks from "./HowItWorks";
import Examples from "./Examples";
import Admin from "./Admin";
import {LoginRoute, RegisterRoute} from "./Auth";
import SellNewCar from "./SellNewCar";
import Privacy from "./Privacy";
import {reducer as formReducer} from 'redux-form';

import {loadTranslations, setLocale, syncTranslationWithStore, i18nReducer} from 'react-redux-i18n';
import {injectReducer} from "../store/reducers";
// import {config as ravenConfig} from "raven-js"; // https://sentry.io

// Bonus
import {authSetUser} from "./Auth/modules/auth.module";
import {getStoredUser} from "../utils/userUtils";

export const createRoutes = (store) => {
  // ========================================================
  // Translation setup
  // ========================================================
  injectReducer(store, {key: "i18n", reducer: i18nReducer});
  injectReducer(store, {key: "toastr", reducer: require("react-redux-toastr").reducer});
  injectReducer(store, {key: "auth", reducer: require("./Auth/modules/auth.module").default});
  syncTranslationWithStore(store);
  // store.dispatch(loadTranslations({
  //   et: {},
  //   en: {}
  // }));
  store.dispatch(loadTranslations({
    et: require("./../store/translations/et.json"),
    en: require("./../store/translations/en.json")
  }));
  store.dispatch(setLocale('et'));

  injectReducer(store, {key: "form", reducer: formReducer});

  // ========================================================
  // Logged in user setup
  // ========================================================
  store.dispatch(authSetUser(getStoredUser()));

  return {
    path: "/",
    component: CoreLayout,
    indexRoute: Home(store),
    childRoutes: [
      Details(store),
      About(store),
      HowItWorks(store),
      Examples(store),
      Admin(store),
      LoginRoute(store),
      RegisterRoute(store),
      Search(store),
      SellNewCar(store),
      Privacy(store)
    ]
  };

};

export default createRoutes;
