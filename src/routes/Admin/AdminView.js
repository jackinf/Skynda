/**
 * Created by jevgenir on 10/21/2016.
 */
import React from "react";
import {Row, Col} from "react-bootstrap";
import {Link} from "react-router";

class AdminView extends React.Component {
  render() {
    return <div className="container">
      <h2>Administration</h2>

      <Row>
        <Link to={"admin/cars"}>Cars</Link>
      </Row>

      <Row>
        <Col sm={12}>
          {this.props.children}
        </Col>
      </Row>
    </div>;
  }
}

export default AdminView;
