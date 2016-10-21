import ReduxFormRoute from "./routes/ReduxForm";
import CarManagementRoute from "./routes/CarManagement";

export default (store) => ({
  path: "examples",
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const ExampleView = require("./ExampleView").default;
      cb(null, ExampleView);
    })
  },
  childRoutes: [
    ReduxFormRoute(store),
    CarManagementRoute(store)
  ]
})
