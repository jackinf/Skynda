// We only need to import the modules necessary for initial render
import CoreLayout from "../layouts/CoreLayout/CoreLayout";
import Home from "./Home";
import Search from "./Search";
import Details from "./Details";
import About from "./About";
import Examples from "./Examples";
import Admin from "./Admin";
import {LoginRoute, RegisterRoute} from "./Auth";
import SellNewCar from "./SellNewCar";

import {loadTranslations, setLocale, syncTranslationWithStore, i18nReducer} from 'react-redux-i18n';
import {injectReducer} from "../store/reducers";

// Bonus
import {authSetUser} from "./Auth/modules/auth.module";
import {getStoredUser} from "../utils/userUtils";

export const createRoutes = (store) => {

  // ========================================================
  // Translation setup
  // ========================================================
  injectReducer(store, {key: "i18n", reducer: i18nReducer});
  injectReducer(store, {key: "auth", reducer: require("./Auth/modules/auth.module").default});
  syncTranslationWithStore(store);
  store.dispatch(loadTranslations({
    et: require("./../store/translations/et.json"),
    en: require("./../store/translations/en.json")
  }));
  store.dispatch(setLocale('et'));

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
      Examples(store),
      Admin(store),
      LoginRoute(store),
      RegisterRoute(store),
      Search(store),
      SellNewCar(store)
    ]
  };

};

export default createRoutes;
