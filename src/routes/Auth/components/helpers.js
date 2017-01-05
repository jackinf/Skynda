/**
 * Created by jevgenir on 11/8/2016.
 */

import React from "react";
import {Row, Col} from "react-bootstrap";

/**
 * Wraps a login-register row consistently
 * @param block
 */
export const rowWrapper = (block) =>
  (<Row style={{"margin": "10px", "padding": "5px"}}>
    <Col xs={9} xsOffset={3}>{block}</Col>
  </Row>);
