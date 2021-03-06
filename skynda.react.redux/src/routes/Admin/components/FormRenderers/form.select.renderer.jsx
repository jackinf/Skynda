import React from "react";
import {Row, Col} from "react-bootstrap";
import Select from "react-select";
import "react-image-crop/dist/ReactCrop.css";

export const selectRenderer = (items, onChange, isMulti = false) => ({input, label, meta: {touched, error}, ...custom}) => (
  <Row style={{marginBottom: "10px"}}>
    <Col sm={12}>
      <label className="sell-your-car__label" htmlFor={input.name}>{label}</label>
      <Select.Creatable name={input.name}
                        value={input.value}
                        options={items}
                        onChange={value => onChange(input.name, value)}
                        multi={isMulti}
      />
    </Col>
  </Row>
);

export default selectRenderer;
