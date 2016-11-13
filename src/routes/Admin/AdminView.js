/**
 * Created by jevgenir on 10/21/2016.
 */
import React from "react";
import {Row, Col, Breadcrumb} from "react-bootstrap";
import {browserHistory} from "react-router"


class AdminView extends React.Component {
  goTo(path) {
    browserHistory.push(path)
  }

  render() {
    return <div className="container">
      <h2>Administration</h2>

      <Breadcrumb>
        <Breadcrumb.Item onClick={e => this.goTo("/admin/vehicle")}>
          Vehicles
        </Breadcrumb.Item>
        <Breadcrumb.Item onClick={e => this.goTo("/admin/vehicle-model")}>
          Vehicle Models
        </Breadcrumb.Item>
        <Breadcrumb.Item onClick={e => this.goTo("/admin/classifier")}>
          Classifiers
        </Breadcrumb.Item>
      </Breadcrumb>

      <Row>
        <Col sm={12}>
          {this.props.children}
        </Col>
      </Row>
    </div>;
  }
}

export default AdminView;
