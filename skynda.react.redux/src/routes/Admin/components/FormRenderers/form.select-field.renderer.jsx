import React from "react";
import {Row, Col} from "react-bootstrap";
import SelectField from 'material-ui/SelectField';

const renderSelectField = ({input, label, meta: {touched, error}, children, ...custom}) => (
  <Row style={{marginBottom: "10px"}}>
    <Col sm={12}>
      <SelectField
        floatingLabelText={label}
        errorText={touched && error}
        {...input}
        onChange={(event, index, value) => input.onChange(value)}
        children={children}
        {...custom}/>
    </Col>
  </Row>
);

export default renderSelectField;
