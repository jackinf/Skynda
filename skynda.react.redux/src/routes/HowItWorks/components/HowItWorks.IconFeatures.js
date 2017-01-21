/**
 * Created by jevgenir on 11/27/2016.
 */

import React from "react";
import {Row, Col} from "react-bootstrap";
import image_icon1 from "../../../static/images/standard/happy@2x.png";
import image_icon2 from "../../../static/images/standard/ok@2x.png";
import image_icon3 from "../../../static/images/standard/clock@2x.png";
import {Translate} from "react-redux-i18n";
import Scroll from "react-scroll";

export default class extends React.Component {
  static propTypes = {
    displayMode: React.PropTypes.string.isRequired
  };

  render() {
    return (<div className="container">
      <Scroll.Element name="how-it-works-icon-features" />
      <Row className="how-it-works__icon-features how-it-works__centered">
        <Col sm={4}>
          <img className="how-it-works__feature-icon" src={image_icon1} alt="Comfortable"/>
          <h3 className="how-it-works__primary-header">
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
          <img className="how-it-works__feature-icon" src={image_icon2} alt="Secure"/>
          <h3 className="how-it-works__primary-header">
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
            </ul>
          </div>
        </Col>
        <Col sm={4}>
          <img className="how-it-works__feature-icon" src={image_icon3} alt="Faster"/>
          <h3 className="how-it-works__primary-header">
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
