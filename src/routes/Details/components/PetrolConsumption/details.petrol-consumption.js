/**
 * Created by zekar on 9/15/2016.
 */

import React from 'react';
import '../../Details.scss';
import {Row, Col} from 'react-bootstrap';

// Images
import image_gas_station_2x from './../../../../static/images/standard/gas_station@2x.png';

// Components
import Skblock from './../details.skblock';

class PetrolConsumption extends React.Component {
  render() {
    const {city, highway, average} = this.props.petrol_consumption;

    return (<Skblock header={'Petrol Consumption'}>
      <Col md={6}>
        <img src={image_gas_station_2x} className="sk_details__icon_list_image"/>
      </Col>
      <Col md={6}>  {/*style="padding: 5px 0;"*/}
        <Row>
          <Col md={6}><label>City: </label></Col>
          <Col md={6}>{city}</Col>
        </Row>
        <Row>
          <Col md={6}><label>Highway: </label></Col>
          <Col md={6}>{highway}</Col>
        </Row>
        <Row>
          <Col md={6}><label>Average: </label></Col>
          <Col md={6}>{average}</Col>
        </Row>
      </Col>
    </Skblock>);
  }
}

PetrolConsumption.propTypes = {
  petrol_consumption: React.PropTypes.shape({
    city: React.PropTypes.string.isRequired,
    highway: React.PropTypes.string.isRequired,
    average: React.PropTypes.string.isRequired
  })
};

export default PetrolConsumption;
