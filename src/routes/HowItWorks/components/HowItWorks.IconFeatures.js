/**
 * Created by jevgenir on 11/27/2016.
 */

import React from "react";
import {Row, Col} from "react-bootstrap";
import image_icon1 from "../../../static/images/standard/happy@2x.png";
import image_icon2 from "../../../static/images/standard/ok@2x.png";
import image_icon3 from "../../../static/images/standard/clock@2x.png";

export default class extends React.Component {
  render() {
    return (<div className="container">
      <Row className="how-it-works__icon-features how-it-works__centered">
        <Col sm={4}>
          <img className="how-it-works__feature-icon" src={image_icon1} alt="Comfortable"/>
          <h3 className="how-it-works__primary-header">Mugavam</h3>
          <div className="how-it-works__description">Siia tekst mis ei ole üle 3 rea pikk</div>
        </Col>
        <Col sm={4}>
          <img className="how-it-works__feature-icon" src={image_icon2} alt="Secure"/>
          <h3 className="how-it-works__primary-header">Turvalisem</h3>
          <div className="how-it-works__description">Siia tekst mis ei ole üle 3 rea pikk</div>
        </Col>
        <Col sm={4}>
          <img className="how-it-works__feature-icon" src={image_icon3} alt="Faster"/>
          <h3 className="how-it-works__primary-header">Kiirem</h3>
          <div className="how-it-works__description">Siia tekst mis ei ole üle 3 rea pikk</div>
        </Col>
      </Row>
    </div>)
  }
}
