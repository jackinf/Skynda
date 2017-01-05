/**
 * Created by jevgenir on 11/27/2016.
 */

import React from "react";
import {Row, Col, Well} from "react-bootstrap";

export default class extends React.Component {
  render() {
    return (<Well>
      <Row>
        <Col sm={8} smOffset={2}>
          <div className="how-it-works__description-text__text">
            Skynda hoolitseb selle eest, et sa ei pea enam kunagi kolama mudastel automüügi platsidel ega käima
            kümnetel proovisõitudel. Sinu jaoks toimub kogu protsess mugavalt veebis ning Skynda hoolitseb ise kõige
            eest.
          </div>
        </Col>
        <Col sm={2}></Col>
      </Row>
    </Well>)
  }
}
