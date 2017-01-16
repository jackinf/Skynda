/**
 * Created by jevgenir on 11/27/2016.
 */

import React from "react";
import {Button, Row, Col} from "react-bootstrap";
import {Parallax} from 'react-parallax';
import heroImageUrl from "../assets/heroimage.png";
import {Translate} from "react-redux-i18n";

export default class extends React.Component {
  static propTypes = {
    onWantToBuyClick: React.PropTypes.func.isRequired,
    onWantToSellClick: React.PropTypes.func.isRequired,
    displayMode: React.PropTypes.string.isRequired
  };

  componentDidMount() {
    setTimeout(() => {window.scrollBy(0, 1);}, 100);  // hack to fix parallax image
  }

  render() {
    const {onWantToBuyClick, onWantToSellClick} = this.props;

    return (<div>
      <Parallax bgImage={heroImageUrl} strength={300}>
        <div style={{marginTop: "100px", marginBottom: "100px"}}>
          <div className="how-it-works__centered">
            <Row>
              <Col sm={3} />
              <Col sm={6}>
                <h3 className="how-it-works__main-image-background__title">
                  <Translate value="how_it_works.banner_text"/>
                </h3>
              </Col>
              <Col sm={3} />
            </Row>

            <h3 className="how-it-works__main-image-background__title">Kas soovid autot osta või müüa?</h3>
            <Button className="how-it-works__main-image-background__primary-button"
                    onClick={e => onWantToBuyClick()}>
              Soovin osta
            </Button>
            <Button className="how-it-works__main-image-background__secondary-button"
                    onClick={e => onWantToSellClick()}>
              Soovin müüa
            </Button>
          </div>
        </div>
      </Parallax>

    </div>)
  }
}
