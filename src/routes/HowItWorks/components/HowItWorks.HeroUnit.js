/**
 * Created by jevgenir on 11/27/2016.
 */

import React from "react";
import {Button, Row, Col} from "react-bootstrap";
import {browserHistory} from "react-router";
import {Parallax} from 'react-parallax';
import heroImageUrl from "../assets/heroimage.png";

// I've left the second solution how to display hero image if something bad happens to current parallax solution
const old = (<div className="how-it-works__centered how-it-works__main-image-background">
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
</div>);


export default class extends React.Component {
  componentDidMount() {
    setTimeout(() => {window.scrollBy(0, 1);}, 100);  // hack to fix parallax image
  }

  render() {
    return (<div>
      <Parallax bgImage={heroImageUrl} strength={300}>
        <div style={{marginTop: "100px", marginBottom: "100px"}}>
          <div className="how-it-works__centered">
            <Row>
              <Col sm={3}></Col>
              <Col sm={6}>
                <h3 className="how-it-works__main-image-background__title">
                  Skynda on kasutatud autode vahendaja, mis pakub nii müüjale kui ostjale suurepärast
                  lisavarustustpaketti
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
        </div>
      </Parallax>

    </div>)
  }
}
