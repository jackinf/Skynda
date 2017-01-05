/**
 * Created by jevgenir on 10/21/2016.
 */
import VehiclesRoute from "./routes/Vehicles";
import VehicleModelsRoute from "./routes/VehicleModels";
import ClassifiersRoute from "./routes/Classifiers";
import VehicleReportsRoute from "./routes/VehicleReports";
import VehicleReviewsRoute from "./routes/VehicleReviews";
import {isLoggedInAs} from "../../utils/userUtils";

export default (store) => ({
  path: "admin",
  getComponent(nextState, callBack) {
    require.ensure([], (require) => {
      callBack(null, require("./AdminView").default);
    })
  },
  childRoutes: [
    VehiclesRoute(store),
    VehicleModelsRoute(store),
    ClassifiersRoute(store),
    VehicleReportsRoute(store),
    VehicleReviewsRoute(store)
  ],

  /**
   * Router helper function to check if we need to be redirected.
   * @param nextState
   * @param replace
   */
  onEnter: (nextState, replace) => {
    // console.info("ON ENTER REQUIRE AUTH?");
    if (!isLoggedInAs(["admin"])) {
      // console.info("NOT LOGGED IN, REDIRECTING");
      replace({ nextPathname: nextState.location.pathname, pathname: '/login' });
    }
  }
})
