/**
 * Created by jevgenir on 10/21/2016.
 */
import CarsRoute from "./routes/Cars";

export default (store) => ({
  path: "admin",
  getComponent(nextState, callBack) {
    require.ensure([], (require) => {
      callBack(null, require("./AdminView").default);
    })
  },
  childRoutes: [
    CarsRoute(store)
  ]
})
