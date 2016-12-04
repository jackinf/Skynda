import React, {Component, PropTypes} from "react";
import {browserHistory, Router} from "react-router";
import {Provider} from "react-redux";
import ReduxToastr from "react-redux-toastr";

class AppContainer extends Component {
  static propTypes = {
    routes : PropTypes.object.isRequired,
    store  : PropTypes.object.isRequired
  };

  shouldComponentUpdate() {
    return false;
  }

  render() {
    const {routes, store} = this.props;

    return (
      <Provider store={store}>
        <div style={{height: "100%"}}>
          <Router history={browserHistory} children={routes} />
          <ReduxToastr timeOut={4000}
                       newestOnTop={false}
                       preventDuplicates={true}
                       position="top-left"
                       transitionIn="fadeIn"
                       transitionOut="fadeOut"
                       progressBar />
        </div>
      </Provider>
    );
  }
}

export default AppContainer;
