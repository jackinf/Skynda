/**
 * Created by jevgenir on 11/27/2016.
 */

import React from "react";
import {Row, Col} from "react-bootstrap";

export default class extends React.Component {
  render() {
    return (<div>
      <Row>
        <Col sm={8} smOffset={2}>
          <h3 className="how-it-works__centered how-it-works__primary-header">Auto ostmiseks on 3 lihtsat sammu</h3>
        </Col>
      </Row>
      <br/>
      <Row>
        <Col sm={4}></Col>
        <Col sm={4}>
          <div className="how-it-works__line">&nbsp;</div>
        </Col>
        <Col sm={4}></Col>
      </Row>
      <Row>
        <Col sm={3}></Col>
        <Col sm={2}>
          <div className="how-it-works__three-steps__step-circle">1</div>
          <br/>
          <div className="how-it-works__three-steps__step-text">Vali auto välja</div>
        </Col>
        <Col sm={2}>
          <div className="how-it-works__three-steps__step-circle">2</div>
          <br/>
          <div className="how-it-works__three-steps__step-text">Täida kontaktivorm</div>
        </Col>
        <Col sm={2}>
          <div className="how-it-works__three-steps__step-circle">3</div>
          <br/>
          <div className="how-it-works__three-steps__step-text">Toome auto kohale</div>
        </Col>
        <Col sm={3}></Col>
      </Row>
      <hr/>
    </div>)
  }
}
