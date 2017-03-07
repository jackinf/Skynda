import React from "react";
import TextField from 'material-ui/TextField';
import {Row, Col} from "react-bootstrap";

export const renderTextField = ({input, label, errors, meta: {touched, error}, ...custom}) => (
  <Row style={{marginBottom: "10px"}}>
    <Col sm={12}>
      <TextField hintText={label} floatingLabelText={label} errorText={errors && errors[input.name] || touched && error} {...input} {...custom} />
    </Col>
  </Row>
);

export default renderTextField;
