/**
 * Created by zekar on 9/15/2016.
 */

import React from "react";
import "../Details.scss";
import {Row, Col} from "react-bootstrap";
import translations from "../../../../store/locales/et";

// Images
import imageGasStation2x from "./../../../../static/images/standard/gas_station@2x.png";

// Components
import Skblock from "../BlockContainer";

class PetrolConsumption extends React.Component {
  render() {
    const {city, highway, average} = this.props.petrolConsumption;

    return (<Skblock header={translations.routes.details.components.petrol.header}>
      <Col md={6}>
        <img src={imageGasStation2x} className='sk_details__icon_list_image'/>
      </Col>
      <Col md={6}>
        <Row>
          <Col md={6}><label>{translations.routes.details.components.petrol.city}: </label></Col>
          <Col md={6}>{city}</Col>
        </Row>
        <Row>
          <Col md={6}><label>{translations.routes.details.components.petrol.highway}: </label></Col>
          <Col md={6}>{highway}</Col>
        </Row>
        <Row>
          <Col md={6}><label>{translations.routes.details.components.petrol.average}: </label></Col>
          <Col md={6}>{average}</Col>
        </Row>
      </Col>
    </Skblock>);
  }
}

PetrolConsumption.propTypes = {
  petrolConsumption: React.PropTypes.shape({
    city: React.PropTypes.string.isRequired,
    highway: React.PropTypes.string,  // isRequired
    average: React.PropTypes.string   // isRequired
  })
};

export default PetrolConsumption;
