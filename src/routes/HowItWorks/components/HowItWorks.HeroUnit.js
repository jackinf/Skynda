/**
 * Created by jevgenir on 11/27/2016.
 */

import React from "react";
import {Button, Row, Col} from "react-bootstrap";
import {browserHistory} from "react-router";

export default class extends React.Component {
  render() {
    return (<div>
      <div className="how-it-works__centered how-it-works__main-image-background">
        <Row>
          <Col sm={3}></Col>
          <Col sm={6}>
            <h3 className="how-it-works__main-image-background__title">
              Skynda on kasutatud autode vahendaja, mis pakub nii müüjale kui ostjale suurepärast lisavarustustpaketti
            </h3>
          </Col>
          <Col sm={3}></Col>
        </Row>

        <h3 className="how-it-works__main-image-background__title">Kas soovid autot osta või müüa?</h3>
        <Button className="how-it-works__main-image-background__primary-button"
                onClick={e => browserHistory.push("/search")}>
          Soovin osta
        </Button>
        <Button className="how-it-works__main-image-background__secondary-button"
                onClick={e => browserHistory.push("/sell-new-car")}>
          Soovin müüa
        </Button>
      </div>
    </div>)
  }
}
