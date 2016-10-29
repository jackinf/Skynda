import React from "react";
import {Row, Col} from "react-bootstrap";

class ExampleView extends React.Component {
  render() {
    return <div className="container">
      <h2>Examples</h2>

      <Row>
        <Col sm={12}>
          {this.props.children}
        </Col>
      </Row>
    </div>;
  }
}

export default ExampleView;
