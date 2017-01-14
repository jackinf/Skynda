import ReduxFormRoute from "./routes/ReduxForm";
import FileUploadRoute from "./routes/FileUpload";
import ToastrRoute from "./routes/Toastr";
import PipeDriveRoute from "./routes/Pipedrive";
import CropToolRoute from "./routes/CropTool";

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
    ToastrRoute(store),
    FileUploadRoute(store),
    PipeDriveRoute(store),
    CropToolRoute(store)
  ]
})
