import React from "react";
import {Row, Col} from "react-bootstrap";
import translations from "../../../../store/locales/et";

import Skblock from "../BlockContainer";

class Performance extends React.Component {
  render() {
    const {
      driven_wheels,
      compression_ratio,
      compressor_type,
      configuration,
      cylinders,
      displacement,
      fuel_type,
      horsepower,
      size,
      torque,
      total_valves,
      power_train
    } = this.props.performance;

    const parameterBlockFn = (label, value) => (<Col md={6}>
      <Row>
        <Col md={6} xs={4}><label>{label}</label></Col>
        <Col md={6} xs={8}>{value}</Col>
      </Row>
    </Col>);

    return (<Skblock header={translations.routes.details.components.performance.header}>
      {parameterBlockFn(translations.routes.details.components.performance.wheel_drive, driven_wheels)}
      {parameterBlockFn(translations.routes.details.components.performance.fuel_type, fuel_type)}
      {parameterBlockFn(translations.routes.details.components.performance.horsepower, horsepower)}
      {parameterBlockFn(translations.routes.details.components.performance.compression, compression_ratio)}
      {parameterBlockFn(translations.routes.details.components.performance.engine_size, size)}
      {parameterBlockFn(translations.routes.details.components.performance.compressor_type, compressor_type)}
      {parameterBlockFn(translations.routes.details.components.performance.torque, torque)}
      {parameterBlockFn(translations.routes.details.components.performance.config, configuration)}
      {parameterBlockFn(translations.routes.details.components.performance.valves, total_valves)}
      {parameterBlockFn(translations.routes.details.components.performance.cylinders, cylinders)}
      {parameterBlockFn(translations.routes.details.components.performance.powertrain, power_train)}
      {parameterBlockFn(translations.routes.details.components.performance.displacement, displacement)}
    </Skblock>);
  }
}

Performance.propTypes = {
  performance: React.PropTypes.shape({
    driven_wheels: React.PropTypes.string.isRequired,
    doors: React.PropTypes.number.isRequired,
    compression_ratio: React.PropTypes.number.isRequired,
    compressor_type: React.PropTypes.string.isRequired,
    configuration: React.PropTypes.string.isRequired,
    cylinders: React.PropTypes.number.isRequired,
    displacement: React.PropTypes.number.isRequired,
    fuel_type: React.PropTypes.string.isRequired,
    horsepower: React.PropTypes.number.isRequired,
    size: React.PropTypes.number.isRequired,
    torque: React.PropTypes.number.isRequired,
    total_valves: React.PropTypes.number.isRequired,
    power_train: React.PropTypes.string.isRequired
  })
};

export default Performance;
