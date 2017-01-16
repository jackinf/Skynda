/**
 * Created by jevgenir on 11/27/2016.
 */

import React from "react";
import {Row, Col, Well} from "react-bootstrap";
import {Translate} from "react-redux-i18n";
import {DISPLAY_MODE} from "../HowItWorks.constants";

export default class extends React.Component {
  static propTypes = {
    displayMode: React.PropTypes.string.isRequired
  };

  render() {
    const displayMode = this.props.displayMode;

    return (<Well>
      <Row>
        <Col sm={8} smOffset={2}>
          <div className="how-it-works__description-text__text">
            {displayMode === DISPLAY_MODE.WANT_TO_BUY ? <Translate value="how_it_works.buyer_intro" />
              : displayMode === DISPLAY_MODE.WANT_TO_SELL ? <Translate value="how_it_works.sell_intro" />
                : ""
            }
          </div>
        </Col>
        <Col sm={2} />
      </Row>
    </Well>)
  }
}
