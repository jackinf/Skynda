/**
 * Created by jevgenir on 11/27/2016.
 */

import React from "react";
// import Collapse, {Panel} from "rc-collapse";
import {Well, Row, Col, ButtonGroup, Button} from "react-bootstrap";
import "rc-collapse/assets/index.css";
import {Translate} from "react-redux-i18n";
import {DISPLAY_MODE} from "../HowItWorks.constants";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import arrowUp from "../assets/arrow_up.png";
import arrowDown from "../assets/arrow_down.png";


const buyFaqPanels = [
  {
    id: 1,
    questionText: <Translate value="how_it_works.buy_faq_q01" />,
    answerText: <Translate value="how_it_works.buy_faq_a01" />
  },
  {
    id: 2,
    questionText: <Translate value="how_it_works.buy_faq_q02" />,
    answerText: <Translate value="how_it_works.buy_faq_a02" />
  },
  {
    id: 3,
    questionText: <Translate value="how_it_works.buy_faq_q03" />,
    answerText: <Translate value="how_it_works.buy_faq_a03" />
  },
  {
    id: 4,
    questionText: <Translate value="how_it_works.buy_faq_q04" />,
    answerText: <Translate value="how_it_works.buy_faq_a04" />
  },
  {
    id: 5,
    questionText: <Translate value="how_it_works.buy_faq_q05" />,
    answerText: <Translate value="how_it_works.buy_faq_a05" />
  },
  {
    id: 6,
    questionText: <Translate value="how_it_works.buy_faq_q06" />,
    answerText: <Translate value="how_it_works.buy_faq_a06" />
  },
  {
    id: 7,
    questionText: <Translate value="how_it_works.buy_faq_q07" />,
    answerText: <Translate value="how_it_works.buy_faq_a07" />
  },
  {
    id: 8,
    questionText: <Translate value="how_it_works.buy_faq_q08" />,
    answerText: <Translate value="how_it_works.buy_faq_a08" />
  },
  {
    id: 9,
    questionText: <Translate value="how_it_works.buy_faq_q09" />,
    answerText: <Translate value="how_it_works.buy_faq_a09" />
  },
  {
    id: 10,
    questionText: <Translate value="how_it_works.buy_faq_q10" />,
    answerText: <Translate value="how_it_works.buy_faq_a10" />
  },
  {
    id: 11,
    questionText: <Translate value="how_it_works.buy_faq_q11" />,
    answerText: <Translate value="how_it_works.buy_faq_a11" />
  },
  {
    id: 12,
    questionText: <Translate value="how_it_works.buy_faq_q12" />,
    answerText: <Translate value="how_it_works.buy_faq_a12" />
  },
  {
    id: 13,
    questionText: <Translate value="how_it_works.buy_faq_q13" />,
    answerText: <Translate value="how_it_works.buy_faq_a13" />
  }];
const sellFaqPanels = [
  {
    id: 14,
    questionText: <Translate value="how_it_works.sell_faq_q01" />,
    answerText: <Translate value="how_it_works.sell_faq_a01" />
  },
  {
    id: 15,
    questionText: <Translate value="how_it_works.sell_faq_q02" />,
    answerText: <Translate value="how_it_works.sell_faq_a02" />
  },
  {
    id: 16,
    questionText: <Translate value="how_it_works.sell_faq_q03" />,
    answerText: <Translate value="how_it_works.sell_faq_a03" />
  },
  {
    id: 17,
    questionText: <Translate value="how_it_works.sell_faq_q04" />,
    answerText: <Translate value="how_it_works.sell_faq_a04" />
  },
  {
    id: 18,
    questionText: <Translate value="how_it_works.sell_faq_q05" />,
    answerText: <Translate value="how_it_works.sell_faq_a05" />
  },
  {
    id: 19,
    questionText: <Translate value="how_it_works.sell_faq_q06" />,
    answerText: <Translate value="how_it_works.sell_faq_a06" />
  },
  {
    id: 20,
    questionText: <Translate value="how_it_works.sell_faq_q07" />,
    answerText: <Translate value="how_it_works.sell_faq_a07" />
  },
  {
    id: 21,
    questionText: <Translate value="how_it_works.sell_faq_q08" />,
    answerText: <Translate value="how_it_works.sell_faq_a08" />
  },
  {
    id: 22,
    questionText: <Translate value="how_it_works.sell_faq_q09" />,
    answerText: <Translate value="how_it_works.sell_faq_a09" />
  },
  {
    id: 23,
    questionText: <Translate value="how_it_works.sell_faq_q10" />,
    answerText: <Translate value="how_it_works.sell_faq_a10" />
  },
  {
    id: 24,
    questionText: <Translate value="how_it_works.sell_faq_q11" />,
    answerText: <Translate value="how_it_works.sell_faq_a11" />
  },
  {
    id: 25,
    questionText: "Kui kauaks auto müüki pannakse?",
    answerText: "Kuni auto müüdud saab, ajalist piirangut ei ole."
  },
  {
    id: 26,
    questionText: "Kui palju maksab auto müüki panemine?",
    answerText: "Auto müüki panemine on tasuta."
  }];

export default class extends React.Component {
  static propTypes = {
    displayMode: React.PropTypes.string.isRequired
  };

  constructor() {
    super();
    this.state = {expanded: []};
    this.toggleQARow = this.toggleQARow.bind(this);
    this.expandAllQARows = this.expandAllQARows.bind(this);
    this.collapseAllQARows = this.collapseAllQARows.bind(this);
  }

  componentDidMount() {
    // this.expandAllQARows();
  }

  toggleQARow(id) {
    const expanded = this.state.expanded;
    const index = expanded.indexOf(id);
    if (index !== -1) {
      expanded.splice(index, 1);
    } else {
      expanded.push(id);
    }
    this.setState({expanded});
  }

  expandAllQARows() {
    this.setState({expanded: buyFaqPanels.map(panel => panel.id).concat(sellFaqPanels.map(panel => panel.id))});
  }

  collapseAllQARows() {
    this.setState({expanded: []});
  }

  render() {
    const displayMode = this.props.displayMode;

    const displayPanels = displayMode === DISPLAY_MODE.WANT_TO_BUY ? buyFaqPanels
      : displayMode === DISPLAY_MODE.WANT_TO_SELL ? sellFaqPanels
      : [];

    const isBuy = displayMode === DISPLAY_MODE.WANT_TO_BUY;
    const isSell = displayMode === DISPLAY_MODE.WANT_TO_SELL;

    const titleClass = isSell ? "how-it-works__primary-header-sell" : "how-it-works__primary-header";
    const expanded = this.state.expanded;

    return (<div className="container">
      <Row>
        <Col sm={8} smOffset={2}>
          <h3 className={`how-it-works__centered ${titleClass}`}>Küsimused ja vastused</h3>
        </Col>
      </Row>
      <div className="container">
        <Row>
          <Col>
            <ButtonGroup>
              <Button bsStyle="default" onClick={this.expandAllQARows}>Expand all</Button>
              <Button bsStyle="default" onClick={this.collapseAllQARows}>Collapse all</Button>
            </ButtonGroup>
          </Col>
        </Row>
        <br/>

        {displayPanels.map((panel, i) => {
          const isExpanded = expanded.indexOf(panel.id) !== -1;

          return (<span key={i}>
            <Row className="how-it-works__faq-header-row" onClick={e => this.toggleQARow(panel.id)}>
              <Col sm={12}>
                <h4>{i+1}. {panel.questionText}</h4>
                <img src={isExpanded ? arrowUp : arrowDown} alt="arrow" className="how-it-works__faq-header-arrow"/>
              </Col>
            </Row>

            <ReactCSSTransitionGroup transitionName="thing"
                                     transitionEnterTimeout={200}
                                     transitionLeaveTimeout={300}>
              {isExpanded ? (
                <Row key={i} className="how-it-works__faq_answer-row" >
                  <Col sm={12}>
                    {panel.answerText}
                  </Col>
                </Row>): ""}
            </ReactCSSTransitionGroup>

          </span>);
        })}
      </div>

      {/*<Row>*/}
        {/*<Col sm={8} smOffset={2}>*/}
          {/*<Collapse accordion={false}>*/}
            {/*{displayPanels.map((panel, i) => (*/}
              {/*<Panel key={i} className="how-it-works__faq-panel" header={panel.questionText}>*/}
                {/*<Well>*/}
                  {/*{panel.answerText}*/}
                {/*</Well>*/}
              {/*</Panel>*/}
            {/*))}*/}
          {/*</Collapse>*/}
        {/*</Col>*/}
      {/*</Row>*/}
    </div>)
  }
}
