/**
 * Created by jevgenir on 11/27/2016.
 */

import React from "react";
import {Row, Col} from "react-bootstrap";
import image_icon1_buy from "../assets/mugav_sinine-min.png";
import image_icon2_buy from "../assets/turvaline_sinine-min.png";
import image_icon3_buy from "../assets/lihtne_sinine-min.png";
import image_icon1_sell from "../assets/mugav_roh-min.png";
import image_icon2_sell from "../assets/turvaline_roh-min.png";
import image_icon3_sell from "../assets/lihtne_roh-min.png";
import {Translate} from "react-redux-i18n";
import {DISPLAY_MODE} from "../HowItWorks.constants";
import Scroll from "react-scroll";

export default class extends React.Component {
  static propTypes = {
    displayMode: React.PropTypes.string.isRequired
  };

  render() {
    const {displayMode} = this.props;

    const isBuy = displayMode === DISPLAY_MODE.WANT_TO_BUY;
    const isSell = displayMode === DISPLAY_MODE.WANT_TO_SELL;

    const titleClass = isSell ? "how-it-works__primary-header-sell" : "how-it-works__primary-header";

    return (<div className="container">
      <Scroll.Element name="how-it-works-icon-features" />
      <Row className="how-it-works__icon-features how-it-works__centered">
        <Col sm={4}>
          <img className="how-it-works__feature-icon" src={isSell ? image_icon1_sell : image_icon1_buy} alt="Comfortable"/>
          <h3 className={titleClass}>
            <Translate value="how_it_works.why_bubble_1" />
          </h3>
          <div className="how-it-works__description">
            <ul>
              <li>
                <Translate value="how_it_works.why_bubble_1_description_1" />
              </li>
              <li>
                <Translate value="how_it_works.why_bubble_1_description_2" />
              </li>
            </ul>
          </div>
        </Col>
        <Col sm={4}>
          <img className="how-it-works__feature-icon" src={isSell ? image_icon2_sell : image_icon2_buy} alt="Secure"/>
          <h3 className={titleClass}>
            <Translate value="how_it_works.why_bubble_2" />
          </h3>
          <div className="how-it-works__description">
            <ul>
              <li>
                <Translate value="how_it_works.why_bubble_2_description_1" />
              </li>
              <li>
                <Translate value="how_it_works.why_bubble_2_description_2" />
              </li>
              <li>
                <Translate value="how_it_works.why_bubble_2_description_3" />
              </li>
            </ul>
          </div>
        </Col>
        <Col sm={4}>
          <img className="how-it-works__feature-icon" src={isSell ? image_icon3_sell : image_icon3_buy} alt="Faster"/>
          <h3 className={titleClass}>
            <Translate value="how_it_works.why_bubble_3" />
          </h3>
          <div className="how-it-works__description">
            <ul>
              <li>
                <Translate value="how_it_works.why_bubble_3_description_1" />
              </li>
              <li>
                <Translate value="how_it_works.why_bubble_3_description_2" />
              </li>
            </ul>
          </div>
        </Col>
      </Row>
    </div>)
  }
}
