import React from "react";
import {Row, Col} from "react-bootstrap";

/**
 * Wraps a login-register row consistently
 * @param block
 */
export const rowWrapper = (block) =>
  (<Row style={{"margin": "4px", "padding": "4px"}}>
    <Col xs={12} >{block}</Col>
  </Row>);

