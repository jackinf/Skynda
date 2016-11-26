/**
 * Created by jevgenir on 11/7/2016.
 */

import React from "react";
import {Field} from "redux-form";
import {TextField, Checkbox} from "redux-form-material-ui";
import {RaisedButton} from "material-ui";
import {rowWrapper} from "./helpers";

export default class RegisterComponent extends React.Component {
  render() {
    return (<div className="container">
      <h2>Register</h2>
      <form>
        {rowWrapper(<Field name="username" component={TextField} hintText="Username"/>)}
        {rowWrapper(<Field name="password" component={TextField} type="password" hintText="Password" />)}
        {rowWrapper(<Field name="conditions" component={Checkbox} label="Conditions"/>)}
        {rowWrapper(<RaisedButton label="Submit" onClick={e => this.props.submitRegister(e)}/>)}
      </form>
    </div>)
  }
}
