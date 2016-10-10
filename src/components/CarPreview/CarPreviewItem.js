/**
 * Created by jevgenir on 24/09/2016.
 */

import React from "react";
import "./CarPreviewItem.scss";
import translations from "./../../store/locales/en";

import {Row, Col} from "react-bootstrap";

class CarPreview extends React.Component {
  render() {
    const {year, brand, price, mileage, engine, power, doors, seats, comment} = this.props.car;

    return (<div className='car-preview'>
      <a href={this.props.car.href}>
        <img src={this.props.car.src} className='car-preview__image'/>
      </a>

      <div className='car-preview__info-panel-bg'/>

      <div className='car-preview__info-panel'>
        <Row className='car-preview__info-panel-primary-row '>
          <Col sm={8}>{year} {brand}</Col>
          <Col sm={4}>{price} EUR</Col>
        </Row>
        <Row>
          <Col sm={12}>
            <span style={{margin: "0 25px 0 0"}}>{mileage} km</span>
            <span style={{margin: "0 25px 0 0"}}>{engine} ({power})</span>
            <span style={{margin: "0 25px 0 0"}}>{doors} {translations.components.car_preview.doors}</span>
            <span>{seats} {translations.components.car_preview.seats}</span>
          </Col>
        </Row>
        <Row>
          <Col sm={12}>{comment}</Col>
        </Row>

      </div>
    </div>);
  }
}

CarPreview.propTypes = {
  car: React.PropTypes.shape({
    src: React.PropTypes.string,
    href: React.PropTypes.string,
    year: React.PropTypes.number.isRequired,
    brand: React.PropTypes.string,
    price: React.PropTypes.number.isRequired,
    mileage: React.PropTypes.number.isRequired,
    engine: React.PropTypes.string,
    power: React.PropTypes.string,
    doors: React.PropTypes.number,
    seats: React.PropTypes.number,
    comment: React.PropTypes.string
  }).isRequired
};

export default CarPreview;
