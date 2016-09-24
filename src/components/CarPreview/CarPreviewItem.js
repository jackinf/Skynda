/**
 * Created by jevgenir on 24/09/2016.
 */

import React from 'react';
import './Item.scss';

import {Row, Col} from 'react-bootstrap';

class CarPreview extends React.Component {
  render() {
    const { mileage, engine, power, doors, seats, comment} = this.props.car;

    return (<div className='info_image'>
      <a href={this.props.car.href}>
        <img src={this.props.car.src} className='info_image__image' />
      </a>

      <div className='info_image__info_panel_bg'>
      </div>

      <div className='info_image__info_panel'>
        <Row>
          <Col sm={7} >{mileage} km {engine} ({power})</Col>
          <Col sm={5} >{doors} doors {seats} seats</Col>
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
