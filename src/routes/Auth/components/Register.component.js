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
    return (<form>
      <Row>
        <Col xs={12}>
          <Field name="username" component={TextField} hintText="Username"/>
          <Field name="password" component={TextField} type="password" hintText="Password"/>
          <RaisedButton label="Submit" onClick={e => this.props.submitRegister(e)} />
        </Col>
      </Row>
    </form>)
  }
}
