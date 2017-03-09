import React from "react";
import {Row, Col} from "react-bootstrap";
import Checkbox from 'material-ui/Checkbox';

const renderCheckbox = ({input, label, ...custom}) => (
  <Row style={{marginBottom: "10px"}}>
    <Col sm={12}>
      <Checkbox label={label}
                checked={!!input.value}
                onCheck={input.onChange}/>
    </Col>
  </Row>
);

export default renderCheckbox;
