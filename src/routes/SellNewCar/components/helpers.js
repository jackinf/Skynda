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
  (<Row style={{"margin": "4px", "padding": "4px"}}>
    <Col xs={12} >{block}</Col>
  </Row>);

export const rowWrapperCentered = (block) =>
  (<Row style={{"margin": "4px", "padding": "4px"}}>
    <Col xs={12} sm={6} smOffset={3}>{block}</Col>
    <Col sm={3}></Col>
  </Row>);
