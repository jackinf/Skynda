import React from "react";
import {Row, Col} from "react-bootstrap";
import Select from "react-select";
var I18n = require('react-redux-i18n').I18n;

function getTranslatedFeatures(items) {
  if (items instanceof Array) {
    return items.map(item => ({
      id: item.id,
      value: item.value,
      label: I18n.t(`admin.vehicle_feature_${item.value}`)
    }))
  } else {
    return [];
  }
}

export function selectFeaturesRenderer(items, onChange, isMulti = false) {
  const allItemsTranslated = items;
  return ({input, label, meta: {touched, error}, ...custom}) => {
    const selectedItemsTranslated = input.value;
    return (<Row style={{marginBottom: "10px"}}>
        <Col sm={12}>
          <label className="sell-your-car__label" htmlFor={input.name}>{label}</label>
          <Select name={input.name} value={selectedItemsTranslated} options={allItemsTranslated}
                  onChange={value => onChange(input.name, value)}
                  multi={isMulti}
          />
        </Col>
      </Row>
    );
  };
}

export default selectFeaturesRenderer;
