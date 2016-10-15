/**
 * Created by jevgenir on 24/09/2016.
 */

import React from "react";
import CarPreviewItem from "./CarPreviewItem";

import {Row, Col} from "react-bootstrap";

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
  cars: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  children: React.PropTypes.array
};

export default CarPreviewGrid;
