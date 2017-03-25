/**
 * Created by jevgenir on 11/27/2016.
 */

import React from "react";
import {Button, Row, Col} from "react-bootstrap";
import {Parallax} from 'react-parallax';
import heroImageUrl from "../assets/kuidas_toimib_banner-min.jpg";
import {Translate} from "react-redux-i18n";
import {DISPLAY_MODE} from "../HowItWorks.constants";
import Scroll from "react-scroll";

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
    const {onWantToBuyClick, onWantToSellClick, displayMode} = this.props;

    return (<div>
      <Parallax bgImage={heroImageUrl} strength={300}>
        <div style={{marginTop: "100px", marginBottom: "100px"}}>
          <div className="how-it-works__centered">
            <Row>
              <Col sm={3} />
              <Col sm={6}>
                <h3 className="how-it-works__main-image-background__title">
                  <Row>
                    <Translate value="how_it_works.banner_text"/> <Translate value="how_it_works.banner_text1"/>
                  </Row>
                </h3>
              </Col>
              <Col sm={3} />
            </Row>

            <h3 className="how-it-works__main-image-background__title">Kas soovid autot osta või müüa?</h3>
            <Scroll.Link activeClass="active" to="how-it-works-icon-features" spy={true} smooth={true} offset={50} duration={500}>
              <Button className={`how-it-works__main-image-background__primary-button ${displayMode == DISPLAY_MODE.WANT_TO_BUY ? "button-pressed-haha-first-button" : ""}`}
                      onClick={e => onWantToBuyClick()}>
                Soovin osta
              </Button>
              <Button className={`how-it-works__main-image-background__secondary-button ${displayMode == DISPLAY_MODE.WANT_TO_SELL ? "button-pressed-haha-second-button" : ""}`}
                      onClick={e => onWantToSellClick()}>
                Soovin müüa
              </Button>
            </Scroll.Link>
          </div>
        </div>
      </Parallax>

    </div>)
  }
}
