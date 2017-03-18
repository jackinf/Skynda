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
  static propTypes = {
    isAuthenticated: React.PropTypes.bool.isRequired,
    errorMessage: React.PropTypes.string,
    isFetching: React.PropTypes.bool.isRequired,
    submitLogin: React.PropTypes.func.isRequired
  };

  render() {
    const {isAuthenticated, errorMessage, isFetching, submitLogin} = this.props;

    return isAuthenticated
      ? <Logout />
      : (
        <div className="container">
          <h2>Login</h2>

            {errorMessage
              ?
              <div className="panel panel-danger">
                <div className="panel-heading">Error</div>
                <div className="panel-body">
                  {errorMessage}
                </div>
              </div>
              : null
            }

          <form>
            {rowWrapper(<Field name="username" component={TextField} hintText="Username"/>)}
            {rowWrapper(<Field name="password" component={TextField} type="password" hintText="Password"/>)}
            {rowWrapper(<Field name="rememberme" component={Checkbox} label="Remember me"/>)}
            {rowWrapper(<RaisedButton label="Submit" disabled={isFetching} onClick={e => submitLogin(e)}/>)}
          </form>
        </div>
      );
  }
}
