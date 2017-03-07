import React from "react";
import {Row, Col} from "react-bootstrap";
import "react-image-crop/dist/ReactCrop.css";

export const ErrorBlockRenderer = ({errors}) => {
  return errors.length > 0 ? (
      <Row>
        <Col xs={12}>
          <div className="panel panel-danger">
            <div className="panel-heading">Panel heading</div>
            <ul className="list-group">
              {errors.map((error, i) => (
                <li key={i} className="list-group-item"><b>{error.code}</b>: {error.defaultMessage}</li>
              ))}
            </ul>
          </div>
        </Col>
      </Row>) : <div></div>;
};

export default ErrorBlockRenderer;
