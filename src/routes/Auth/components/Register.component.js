/**
 * Created by jevgenir on 11/7/2016.
 */

import React from "react";
import {Field} from "redux-form";
import {Row, Col} from "react-bootstrap";
import {TextField} from "redux-form-material-ui";
import {RaisedButton} from "material-ui";

export default class RegisterComponent extends React.Component {
  render() {
    const rowWrapper = (block) => (<Row style={{"margin": "10px", "padding": "5px"}}><Col xs={9} xsOffset={3}>{block}</Col></Row>);

    return (<div className="container">
      <h2>Login</h2>
      <form>
        {rowWrapper(<Field name="username" component={TextField} hintText="Username"/>)}
        {rowWrapper(<Field name="password" component={TextField} type="password" hintText="Password"/>)}
        {rowWrapper(<Field name="rememberme" component={Checkbox} label="Remember me"/>)}
        {rowWrapper(<RaisedButton label="Submit" onClick={e => this.props.submitRegister(e)}/>)}
      </form>
    </div>)
  }
}
