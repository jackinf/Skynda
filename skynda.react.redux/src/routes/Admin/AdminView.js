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
        <Breadcrumb.Item onClick={e => this.goTo("/admin")}>
          Home
        </Breadcrumb.Item>
        <Breadcrumb.Item onClick={e => this.goTo("/admin/vehicle")}>
          Vehicles
        </Breadcrumb.Item>
        {/*COMMENTED OUT BECAUSE NO NEED TO SHOW ALL*/}
        {/*<Breadcrumb.Item onClick={e => this.goTo("/admin/vehicle-reports")}>*/}
          {/*Vehicle Report Categories*/}
        {/*</Breadcrumb.Item>*/}
        {/*<Breadcrumb.Item onClick={e => this.goTo("/admin/vehicle-reviews")}>*/}
          {/*Vehicles Reviews*/}
        {/*</Breadcrumb.Item>*/}
        <Breadcrumb.Item onClick={e => this.goTo("/admin/vehicle-model")}>
          Vehicle Models
        </Breadcrumb.Item>
        <Breadcrumb.Item onClick={e => this.goTo("/admin/classifier")}>
          Classifications
        </Breadcrumb.Item>
        <Breadcrumb.Item onClick={e => this.goTo("/admin/images")}>
          Images
        </Breadcrumb.Item>
        <Breadcrumb.Item onClick={e => this.goTo("/admin/feature")}>
          Features
        </Breadcrumb.Item>
      </Breadcrumb>

      <Row>
        <Col sm={12}>
          {this.props.children ? this.props.children : <div className="jumbotron">
            <h2>Welcome to the administration panel</h2>
          </div>}
        </Col>
      </Row>
    </div>;
  }
}

export default AdminView;
