import React from "react";
import {Row, Col} from "react-bootstrap";
import "react-image-crop/dist/ReactCrop.css";
import _ from "underscore";

export const ErrorBlockRenderer = ({errors}) => {

  if (_.isEmpty(errors)) {
    return <div></div>;
  }

  let listOfErrors = [];

  if (_.isObject(errors)){
    _.mapObject(errors, function (message, key) {
      const obj = {key, message};
      listOfErrors.push(obj);
    });
  }

  if(_.isArray(errors)){
    listOfErrors = errors;
  }

  return listOfErrors.length > 0 ? (
      <Row>
        <Col xs={12}>
          <div className="panel panel-danger">
            <div className="panel-heading">Server Errors</div>
            <ul className="list-group">
              {listOfErrors.map((error, i) => (
                <li key={i} className="list-group-item"><b>{error.key}</b>: {error.message}</li>
              ))}
            </ul>
          </div>
        </Col>
      </Row>) : <div></div>;
};

export default ErrorBlockRenderer;
