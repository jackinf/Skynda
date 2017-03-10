import React from "react";
import {Row, Col} from "react-bootstrap";
import {TextField} from "redux-form-material-ui";

export default function renderTextField({label, meta: {touched, error}, children, ...custom}) {
  return (
    <Row>
      <Col sm={12}>
        <TextField
          floatingLabelText={label}
          errorText={touched && error}
          children={children}
          {...custom}/>
      </Col>
    </Row>  )
}
