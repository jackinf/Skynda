import React from "react";
import {Row, Col, Breadcrumb} from "react-bootstrap";
import {browserHistory} from "react-router"

import {canEnter as canEnterVehicles} from "./routes/Vehicles";
import {canEnter as canEnterVehicleModels} from "./routes/VehicleModels";
import {canEnter as canEnterClassifier} from "./routes/Classifiers";
import {canEnter as canEnterImages} from "./routes/Images";
import {canEnter as canEnterFeatures} from "./routes/Features";

function goTo(path) {
  browserHistory.push(path);
}

const breadcrumbs = (<Breadcrumb>
  <Breadcrumb.Item onClick={e => goTo("/admin")}>
    Home
  </Breadcrumb.Item>

  {canEnterVehicles()
    ? (<Breadcrumb.Item onClick={e => goTo("/admin/vehicle")}>
      Vehicles
    </Breadcrumb.Item>)
    : null}

  {canEnterVehicleModels()
    ? (<Breadcrumb.Item onClick={e => goTo("/admin/vehicle-model")}>
      Vehicle Models
    </Breadcrumb.Item>)
    : null}

  {canEnterClassifier()
    ? (<Breadcrumb.Item onClick={e => goTo("/admin/classifier")}>
      Classifications
    </Breadcrumb.Item>)
    : null}

  {canEnterImages()
    ? (<Breadcrumb.Item onClick={e => goTo("/admin/images")}>
      Images
    </Breadcrumb.Item>)
    : null}

  {canEnterFeatures()
    ? (<Breadcrumb.Item onClick={e => goTo("/admin/feature")}>
      Features
    </Breadcrumb.Item>)
    : null}
</Breadcrumb>);

class AdminView extends React.Component {
  render() {
    return <div className="container">
      <h2>Administration</h2>

      {breadcrumbs}

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
