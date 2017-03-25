import React from "react";
import {Row, Col} from "react-bootstrap";
import logoTick from "../assets/turvaline_roh-min.png";

export default class SellNewCarThanksComponent extends React.Component {
  render() {
    return (
      <div>
        <Row>
          <Col>
            <img src={logoTick} alt="Success"/>
          </Col>
        </Row>
        <Row>
          <Col sm={12}>
            <h4>Täname! Saime andmed kätte! Võtame Sinuga ühendust ühe tööpäeva jooksul.</h4>
          </Col>
        </Row>
      </div>
    );
  }
}
