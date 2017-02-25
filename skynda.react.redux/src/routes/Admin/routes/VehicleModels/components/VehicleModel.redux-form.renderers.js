import React from "react";
import {Row, Col} from "react-bootstrap";
import Select from "react-select";

/**
 * Wraps a login-register row consistently
 * @param block
 */
export const rowWrapper = (block) =>
  (<Row style={{"margin": "4px", "padding": "4px"}}>
    <Col xs={12} >{block}</Col>
  </Row>);

export const selectRenderer = (items, onChange, targetName, isMulti = false) => ({input, label, meta: {touched, error}, ...custom}) => (
  <Row style={{marginBottom: "10px"}}>
    <Col sm={12}>
      <label className="sell-your-car__label" htmlFor={input.name}>{label}</label>
      {console.log(items)}
      <Select name={input.name}
              value={input.value}
              options={items}
              onChange={value => onChange(targetName || input.name, value)}
              multi={isMulti}
      />
    </Col>
  </Row>
);
