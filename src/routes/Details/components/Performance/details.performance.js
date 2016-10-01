import React from "react";
import {Row, Col} from 'react-bootstrap';

import Skblock from '../Details.skblock';

class Performance extends React.Component {
  render() {
    const {
      driven_wheels,
      doors,
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
        <Col md={6}><label>{label}</label></Col>
        <Col md={6}>{value}</Col>
      </Row>
    </Col>);

    return (<Skblock header={'Performance'}>
      {parameterBlockFn('Driven wheels', driven_wheels)}
      {parameterBlockFn('Fuel type', fuel_type)}
      {parameterBlockFn('Horsepower', horsepower)}
      {parameterBlockFn('Compression ratio', compression_ratio)}
      {parameterBlockFn('Size', size)}
      {parameterBlockFn('Compressor type', compressor_type)}
      {parameterBlockFn('Torque', torque)}
      {parameterBlockFn('Configuration', configuration)}
      {parameterBlockFn('Total valves', total_valves)}
      {parameterBlockFn('Cylinders', cylinders)}
      {parameterBlockFn('Power train', power_train)}
      {parameterBlockFn('Displacement', displacement)}
    </Skblock>)
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
