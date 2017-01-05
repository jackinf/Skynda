/**
 * Created by jevgenir on 11/8/2016.
 */

import React from "react";
import {RaisedButton} from "material-ui";
import {rowWrapper} from "./helpers";

export default class LogoutComponent extends React.Component {
  render() {
    return (<div className="container">
      <h2>You are currently logged in!</h2>
      {rowWrapper(<RaisedButton label="Log out" onClick={e => this.props.submitLogout(e)}/>)}
    </div>)
  }
}
