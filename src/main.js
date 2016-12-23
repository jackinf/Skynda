import React from "react";
import ReactDOM from "react-dom";
import createStore from "./store/createStore";
import AppContainer from "./containers/AppContainer";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import injectTapEventPlugin from "react-tap-event-plugin";
injectTapEventPlugin();

import "bootstrap/dist/css/bootstrap.min.css";
import "rc-slider/assets/index.css";
import "react-select/dist/react-select.css";
import "nprogress/nprogress.js";
import "nprogress/nprogress.css";
import 'react-redux-toastr/lib/css/react-redux-toastr.css';
import "react-bootstrap-table/dist/react-bootstrap-table.min.css";
import "./main.scss";

// ========================================================
// Store Instantiation
// ========================================================
const initialState = window.___INITIAL_STATE__;
const store = createStore(initialState);

// ========================================================
// Render Setup
// ========================================================
const MOUNT_NODE = document.getElementById("root");

let render = () => {
  const routes = require("./routes/index").default(store);

  ReactDOM.render(
    (<MuiThemeProvider>
      <AppContainer store={store} routes={routes} />
    </MuiThemeProvider>),
    MOUNT_NODE
  );
};

// ========================================================
// Developer Tools Setup
// ========================================================
if (__DEV__) {
  if (window.devToolsExtension) {
    window.devToolsExtension.open();
  }
}

// This code is excluded from production bundle
if (__DEV__) {
  if (module.hot) {
    // Development render functions
    const renderApp = render;
    const renderError = (error) => {
      const RedBox = require("redbox-react").default;

      ReactDOM.render(<RedBox error={error} />, MOUNT_NODE);
    };

    // Wrap render in try/catch
    render = () => {
      try {
        renderApp();
      } catch (error) {
        renderError(error);
      }
    };

    // Setup hot module replacement
    module.hot.accept("./routes/index", () =>
      setImmediate(() => {
        ReactDOM.unmountComponentAtNode(MOUNT_NODE);
        render();
      })
    );
  }
}

// ========================================================
// Go!
// ========================================================
render();
