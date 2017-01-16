/**
 * Created by jevgenir on 10/21/2016.
 */
import React from "react";
import {Row, Col, Breadcrumb} from "react-bootstrap";
import { browserHistory } from "react-router"

class ExampleComponent extends React.Component {
  render() {
    return <div className="container">
      <h2>Examples</h2>

      <Breadcrumb>
        <Breadcrumb.Item onClick={e => browserHistory.push("/examples/redux-form")}>
          Redux form
        </Breadcrumb.Item>
        <Breadcrumb.Item onClick={e => browserHistory.push("/examples/file-upload")}>
          File upload
        </Breadcrumb.Item>
        <Breadcrumb.Item onClick={e => browserHistory.push("/examples/pipedrive")}>
          Pipedrive
        </Breadcrumb.Item>
        <Breadcrumb.Item onClick={e => browserHistory.push("/examples/crop-tool")}>
          Crop tool
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

export default ExampleComponent;
