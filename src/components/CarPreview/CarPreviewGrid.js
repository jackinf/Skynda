/**
 * Created by jevgenir on 24/09/2016.
 */

import React from 'react';
import CarPreviewItem from './CarPreviewItem';

import {Row, Col} from 'react-bootstrap';

class CarPreviewGrid extends React.Component {
  render() {
    return (<section>
      <Row>
        {this.props.cars.map((car, i) =>
          (<Col md={4} key={i}>
            <CarPreviewItem car={car}>{this.props.children}</CarPreviewItem>
          </Col>))}
      </Row>
    </section>);
  }
}

CarPreviewGrid.propTypes = {
  cars: React.PropTypes.arrayOf(React.PropTypes.shape({
    mileage: React.PropTypes.number.isRequired,
    engine: React.PropTypes.string,
    power: React.PropTypes.string,
    doors: React.PropTypes.number,
    seats: React.PropTypes.number,
    comment: React.PropTypes.string
  })).isRequired,
};

export default CarPreviewGrid;
