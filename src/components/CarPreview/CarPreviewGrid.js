/**
 * Created by jevgenir on 24/09/2016.
 */

import React from "react";
import CarPreviewItem from "./CarPreviewItem";

import {Row, Col} from "react-bootstrap";

class CarPreviewGrid extends React.Component {
  render() {
    return (<Row>
      {this.props.vehicles.map((object, i) =>
        (<Col md={4} key={i}>
          <CarPreviewItem vehicle={object}>{this.props.children}</CarPreviewItem>
        </Col>))}
    </Row>

    );
  }
}

CarPreviewGrid.propTypes = {
  vehicles: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  children: React.PropTypes.array
};

export default CarPreviewGrid;
