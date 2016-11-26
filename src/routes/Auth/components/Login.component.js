/**
 * Created by jevgenir on 11/7/2016.
 */

import React from "react";
import {Field} from "redux-form";
import {Checkbox, TextField} from "redux-form-material-ui";
import {RaisedButton} from "material-ui";
import {rowWrapper} from "./helpers";
import Logout from "./../containers/Logout.container";

export default class LoginComponent extends React.Component {
  render() {
    return this.props.auth.isLoggedIn ? <Logout /> : (<div className="container">
      <h2>Login</h2>
      <form>
        {rowWrapper(<Field name="username" component={TextField} hintText="Username"/>)}
        {rowWrapper(<Field name="password" component={TextField} type="password" hintText="Password"/>)}
        {rowWrapper(<Field name="rememberme" component={Checkbox} label="Remember me"/>)}
        {rowWrapper(<RaisedButton label="Submit" onClick={e => this.props.submitLogin(e)}/>)}
      </form>
    </div>);
  }
}
