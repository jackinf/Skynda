/**
 * Created by jevgenir on 11/27/2016.
 */

import React from "react";
import {Row, Col} from "react-bootstrap";
import {Translate} from "react-redux-i18n";
import {DISPLAY_MODE} from "../HowItWorks.constants";

export default class extends React.Component {
  static propTypes = {
    displayMode: React.PropTypes.string.isRequired
  };

  render() {
    const displayMode = this.props.displayMode;

    const buyingSteps = (<span>
      <Row>
        <Col sm={4}/>
        <Col sm={4}>
          <div className="how-it-works__line">&nbsp;</div>
        </Col>
        <Col sm={4}/>
      </Row>
      <Row>
        <Col sm={3}/>
        <Col sm={2}>
          <div className="how-it-works__three-steps__step-circle">1</div>
          <br/>
          <div className="how-it-works__three-steps__step-text">
            <Translate value="how_it_works.buy_process_step_1"/>
          </div>
        </Col>
        <Col sm={2}>
          <div className="how-it-works__three-steps__step-circle">2</div>
          <br/>
          <div className="how-it-works__three-steps__step-text">
            <Translate value="how_it_works.buy_process_step_2"/>
          </div>
        </Col>
        <Col sm={2}>
          <div className="how-it-works__three-steps__step-circle">3</div>
          <br/>
          <div className="how-it-works__three-steps__step-text">
            <Translate value="how_it_works.buy_process_step_3"/>
          </div>
        </Col>
        <Col sm={3}/>
      </Row>
    </span>);

    const sellingSteps = (<span>
      <Row>
        <Col sm={2}/>
        <Col sm={8}>
          <div className="how-it-works__line">&nbsp;</div>
        </Col>
        <Col sm={2}/>
      </Row>
      <Row>
        <Col sm={1}/>
        <Col sm={2}>
          <div className="how-it-works__three-steps__step-circle">1</div>
          <br/>
          <div className="how-it-works__three-steps__step-text">
            <Translate value="how_it_works.sell_process_step_1"/>
          </div>
        </Col>
        <Col sm={2}>
          <div className="how-it-works__three-steps__step-circle">2</div>
          <br/>
          <div className="how-it-works__three-steps__step-text">
            <Translate value="how_it_works.sell_process_step_2"/>
          </div>
        </Col>
        <Col sm={2}>
          <div className="how-it-works__three-steps__step-circle">3</div>
          <br/>
          <div className="how-it-works__three-steps__step-text">
            <Translate value="how_it_works.sell_process_step_3"/>
          </div>
        </Col>
        <Col sm={2}>
          <div className="how-it-works__three-steps__step-circle">4</div>
          <br/>
          <div className="how-it-works__three-steps__step-text">
            <Translate value="how_it_works.sell_process_step_4"/>
          </div>
        </Col>
        <Col sm={2}>
          <div className="how-it-works__three-steps__step-circle">5</div>
          <br/>
          <div className="how-it-works__three-steps__step-text">
            <Translate value="how_it_works.sell_process_step_5"/>
          </div>
        </Col>
        <Col sm={1}/>
      </Row>
    </span>);

    return (<div>
      <Row>
        <Col sm={8} smOffset={2}>
          <h3 className="how-it-works__centered how-it-works__primary-header">Auto ostmiseks on 3 lihtsat sammu</h3>
        </Col>
      </Row>
      <br/>
      {displayMode === DISPLAY_MODE.WANT_TO_BUY ? buyingSteps
        : displayMode === DISPLAY_MODE.WANT_TO_SELL ? sellingSteps
          : ""
      }
      <hr/>
    </div>)
  }
}
