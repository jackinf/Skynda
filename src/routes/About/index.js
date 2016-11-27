import {injectReducer} from "../../store/reducers";
import NProgress from "react-nprogress";

export default (store) => ({
  path : "about", // react-router-i asi, path, kuhu sa sattud
  getComponent(nextState, cb) { // react-router-i asi, alternatiivne viis kuidas route-d include-da
    NProgress.start();
    require.ensure([], (require) => { // NB!!! Seda on sul vaja rakendusjuppide asünkroonseks juurdelaadimiseks
      injectReducer(store, {key: "people", reducer: require("./modules/About.people").default});
      injectReducer(store, {key: "description", reducer: require("./modules/About.description").default});
      cb(null, require("./containers/AboutContainer").default); // react-router-i asi, et initsialiseerid komponenti
      NProgress.done();
    }, "about");  // paned nimeks mida tahad
  }
});
