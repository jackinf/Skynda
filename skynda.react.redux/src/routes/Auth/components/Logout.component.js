/**
 * Created by jevgenir on 11/8/2016.
 */

import React from "react";
import {RaisedButton} from "material-ui";
import {rowWrapper} from "./helpers";

export default class LogoutComponent extends React.Component {
  static propTypes = {
    isFetching: React.PropTypes.bool.isRequired,
    submitLogout: React.PropTypes.func.isRequired
  };

  render() {
    const {isFetching, submitLogout} = this.props;

    return (<div className="container">
      <h2>You are currently logged in!</h2>
      {rowWrapper(<RaisedButton label="Log out" disabled={isFetching} onClick={e => submitLogout(e)}/>)}
    </div>)
  }
}
