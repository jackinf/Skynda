/**
 * Created by zekar on 9/15/2016.
 */

import React from "react";
import "../Details.scss";
import {Row, Col} from "react-bootstrap";
import { Translate } from 'react-redux-i18n';

// Images
import imageGasStation2x from "./../../../../static/images/standard/gas_station@2x.png";

// Components
import Skblock from "../BlockContainer";

class PetrolConsumption extends React.Component {
  render() {
    const {city, highway, average} = this.props.petrolConsumption;

    return (<Skblock header={<Translate value="details.components.petrol.header"/>}>
      <Col md={2}>
        <img src={imageGasStation2x} className='sk_details__icon_list_image'
             style={{"width": "55px", marginTop: "20px"}}/>
      </Col>
      <Col md={10}>
        <Row>
          <Col md={4}><label className="sk_details__label"><Translate value="details.components.petrol.city"/>: </label></Col>
          <Col md={8}>{city}</Col>
        </Row>
        <Row>
          <Col md={4}><label className="sk_details__label"><Translate value="details.components.petrol.highway"/>: </label></Col>
          <Col md={8}>{highway}</Col>
        </Row>
        <Row>
          <Col md={4}><label className="sk_details__label"><Translate value="details.components.petrol.average"/>: </label></Col>
          <Col md={8}>{average}</Col>
        </Row>
      </Col>
    </Skblock>);
  }
}

PetrolConsumption.propTypes = {
  petrolConsumption: React.PropTypes.shape({
    city: React.PropTypes.number,
    highway: React.PropTypes.number,  // isRequired
    average: React.PropTypes.number,   // isRequired
    fuelType: React.PropTypes.string
  })
};

export default PetrolConsumption;
