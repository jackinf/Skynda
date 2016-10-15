import React from "react";
import {Row, Col} from "react-bootstrap";
import translations from "../../../../store/locales/et";

import Skblock from "../BlockContainer";

class Performance extends React.Component {
  render() {
    const {
      drivenWheels,
      compressionRatio,
      compressorType,
      configuration,
      cylinders,
      displacement,
      fuelType,
      horsePower,
      size,
      torque,
      totalValves,
      powerTrain
    } = this.props.performance;

    const parameterBlockFn = (label, value) => (<Col md={6}>
      <Row>
        <Col md={6} xs={4}><label>{label}</label></Col>
        <Col md={6} xs={8}>{value}</Col>
      </Row>
    </Col>);

    return (<Skblock header={translations.routes.details.components.performance.header}>
      {parameterBlockFn(translations.routes.details.components.performance.wheel_drive, drivenWheels)}
      {parameterBlockFn(translations.routes.details.components.performance.fuel_type, fuelType)}
      {parameterBlockFn(translations.routes.details.components.performance.horsepower, horsePower)}
      {parameterBlockFn(translations.routes.details.components.performance.compression, compressionRatio)}
      {parameterBlockFn(translations.routes.details.components.performance.engine_size, size)}
      {parameterBlockFn(translations.routes.details.components.performance.compressor_type, compressorType)}
      {parameterBlockFn(translations.routes.details.components.performance.torque, torque)}
      {parameterBlockFn(translations.routes.details.components.performance.config, configuration)}
      {parameterBlockFn(translations.routes.details.components.performance.valves, totalValves)}
      {parameterBlockFn(translations.routes.details.components.performance.cylinders, cylinders)}
      {parameterBlockFn(translations.routes.details.components.performance.powertrain, powerTrain)}
      {parameterBlockFn(translations.routes.details.components.performance.displacement, displacement)}
    </Skblock>);
  }
}

Performance.propTypes = {
  performance: React.PropTypes.shape({
    drivenWheels: React.PropTypes.string.isRequired,
    doors: React.PropTypes.number.isRequired,
    compressionRatio: React.PropTypes.number.isRequired,
    compressorType: React.PropTypes.string.isRequired,
    configuration: React.PropTypes.string.isRequired,
    cylinders: React.PropTypes.number, // isRequired
    displacement: React.PropTypes.number, // isRequired
    fuelType: React.PropTypes.string.isRequired,
    horsePower: React.PropTypes.number.isRequired,
    size: React.PropTypes.number.isRequired,
    torque: React.PropTypes.number.isRequired,
    totalValves: React.PropTypes.number.isRequired,
    powerTrain: React.PropTypes.string // isRequired
  })
};

export default Performance;
