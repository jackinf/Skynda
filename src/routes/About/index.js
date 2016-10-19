import {injectReducer} from "../../store/reducers";

export default (store) => ({
  path : "about", // react-router-i asi, path, kuhu sa sattud
  getComponent(nextState, cb) { // react-router-i asi, alternatiivne viis kuidas route-d include-da
    require.ensure([], (require) => { // NB!!! Seda on sul vaja rakendusjuppide asünkroonseks juurdelaadimiseks

      // START mingi redux stuff...
      const Container = require("./containers/AboutContainer").default; // redux container
      const peopleReducer = require("./modules/About.people").default;
      const descriptionReducer = require("./modules/About.description").default;
      injectReducer(store, {key: "people", reducer: peopleReducer});
      injectReducer(store, {key: "description", reducer: descriptionReducer});
      // END mingi redux stuff...

      cb(null, Container); // react-router-i asi, et initsialiseerid komponenti
    }, "about");  // paned nimeks mida tahad
  }
});
