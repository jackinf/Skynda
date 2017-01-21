/**
 * Created by jevgenir on 11/27/2016.
 */

import React from "react";
import Collapse, {Panel} from "rc-collapse";
import {Well, Row, Col} from "react-bootstrap";
import "rc-collapse/assets/index.css";
import {Translate} from "react-redux-i18n";
import {DISPLAY_MODE} from "../HowItWorks.constants";

export default class extends React.Component {
  static propTypes = {
    displayMode: React.PropTypes.string.isRequired
  };

  render() {
    const displayMode = this.props.displayMode;

    const buyFaqPanels = [
      {
        questionText: <Translate value="how_it_works.buy_faq_q01" />,
        answerText: <Translate value="how_it_works.buy_faq_a01" />
      },
      {
        questionText: <Translate value="how_it_works.buy_faq_q02" />,
        answerText: <Translate value="how_it_works.buy_faq_a02" />
      },
      {
        questionText: <Translate value="how_it_works.buy_faq_q03" />,
        answerText: <Translate value="how_it_works.buy_faq_a03" />
      },
      {
        questionText: <Translate value="how_it_works.buy_faq_q04" />,
        answerText: <Translate value="how_it_works.buy_faq_a04" />
      },
      {
        questionText: <Translate value="how_it_works.buy_faq_q05" />,
        answerText: <Translate value="how_it_works.buy_faq_a05" />
      },
      {
        questionText: <Translate value="how_it_works.buy_faq_q06" />,
        answerText: <Translate value="how_it_works.buy_faq_a06" />
      },
      {
        questionText: <Translate value="how_it_works.buy_faq_q07" />,
        answerText: <Translate value="how_it_works.buy_faq_a07" />
      },
      {
        questionText: <Translate value="how_it_works.buy_faq_q08" />,
        answerText: <Translate value="how_it_works.buy_faq_a08" />
      },
      {
        questionText: <Translate value="how_it_works.buy_faq_q09" />,
        answerText: <Translate value="how_it_works.buy_faq_a09" />
      },
      {
        questionText: <Translate value="how_it_works.buy_faq_q10" />,
        answerText: <Translate value="how_it_works.buy_faq_a10" />
      },
      {
        questionText: <Translate value="how_it_works.buy_faq_q11" />,
        answerText: <Translate value="how_it_works.buy_faq_a11" />
      },
      {
        questionText: <Translate value="how_it_works.buy_faq_q12" />,
        answerText: <Translate value="how_it_works.buy_faq_a12" />
      },
      {
        questionText: <Translate value="how_it_works.buy_faq_q13" />,
        answerText: <Translate value="how_it_works.buy_faq_a13" />
      }];

    const sellFaqPanels = [
      {
        questionText: <Translate value="how_it_works.sell_faq_q01" />,
        answerText: <Translate value="how_it_works.sell_faq_a01" />
      },
      {
        questionText: <Translate value="how_it_works.sell_faq_q02" />,
        answerText: <Translate value="how_it_works.sell_faq_a02" />
      },
      {
        questionText: <Translate value="how_it_works.sell_faq_q03" />,
        answerText: <Translate value="how_it_works.sell_faq_a03" />
      },
      {
        questionText: <Translate value="how_it_works.sell_faq_q04" />,
        answerText: <Translate value="how_it_works.sell_faq_a04" />
      },
      {
        questionText: <Translate value="how_it_works.sell_faq_q05" />,
        answerText: <Translate value="how_it_works.sell_faq_a05" />
      },
      {
        questionText: <Translate value="how_it_works.sell_faq_q06" />,
        answerText: <Translate value="how_it_works.sell_faq_a06" />
      },
      {
        questionText: <Translate value="how_it_works.sell_faq_q07" />,
        answerText: <Translate value="how_it_works.sell_faq_a07" />
      },
      {
        questionText: <Translate value="how_it_works.sell_faq_q08" />,
        answerText: <Translate value="how_it_works.sell_faq_a08" />
      },
      {
        questionText: <Translate value="how_it_works.sell_faq_q09" />,
        answerText: <Translate value="how_it_works.sell_faq_a09" />
      },
      {
        questionText: <Translate value="how_it_works.sell_faq_q10" />,
        answerText: <Translate value="how_it_works.sell_faq_a10" />
      },
      {
        questionText: <Translate value="how_it_works.sell_faq_q11" />,
        answerText: <Translate value="how_it_works.sell_faq_a11" />
      }];

    const displayPanels = displayMode === DISPLAY_MODE.WANT_TO_BUY ? buyFaqPanels
      : displayMode === DISPLAY_MODE.WANT_TO_SELL ? sellFaqPanels
      : [];

    return (<div>
      <Row>
        <Col sm={8} smOffset={2}>
          <h3 className="how-it-works__centered how-it-works__primary-header">Küsimused ja vastused</h3>
        </Col>
      </Row>
      <Row>
        <Col sm={8} smOffset={2}>
          <Collapse accordion={true}>
            {displayPanels.map((panel, i) => (
              <Panel key={i} className="how-it-works__faq-panel" header={panel.questionText}>
                <Well>
                  {panel.answerText}
                </Well>
              </Panel>
            ))}
          </Collapse>
        </Col>
      </Row>
    </div>)
  }
}
