/**
 * Created by jevgenir on 24/09/2016.
 */

import React from 'react';
import './CarPreviewItem.scss';

import {Row, Col} from 'react-bootstrap';

class CarPreview extends React.Component {
  render() {
    const { mileage, engine, power, doors, seats, comment} = this.props.car;

    return (<div className='car-preview'>
      <a href={this.props.car.href}>
        <img src={this.props.car.src} className='car-preview__image' />
      </a>

      <div className='car-preview__info-panel-bg'>
      </div>

      <div className='car-preview__info-panel'>
        <Row className="car-preview__info-panel-primary-row ">
          <Col sm={8}>2012 Brand and model</Col>
          <Col sm={4}>12 100 EUR</Col>
        </Row>
        <Row>
          <Col sm={12} >
            <span style={{margin: "0 25px 0 0"}}>{mileage} km</span>
            <span style={{margin: "0 25px 0 0"}}>{engine} ({power})</span>
            <span style={{margin: "0 25px 0 0"}}>{doors} doors</span>
            <span>{seats} seats</span>
          </Col>
        </Row>
        <Row>
          <Col sm={12} >{comment}</Col>
        </Row>

      </div>
    </div>);
  }
}

CarPreview.propTypes = {
  car : React.PropTypes.shape({
    mileage: React.PropTypes.number.isRequired,
    engine: React.PropTypes.string,
    power: React.PropTypes.string,
    doors: React.PropTypes.number,
    seats: React.PropTypes.number,
    comment: React.PropTypes.string
  }).isRequired
};

export default CarPreview;
