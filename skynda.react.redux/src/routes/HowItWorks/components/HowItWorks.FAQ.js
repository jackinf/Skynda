/**
 * Created by jevgenir on 11/27/2016.
 */

import React from "react";
import Collapse, {Panel} from "rc-collapse";
import {Well, Row, Col} from "react-bootstrap";
import "rc-collapse/assets/index.css";
import FaBeer from 'react-icons/lib/fa/beer';

export default class extends React.Component {
  render() {
    const panels = [
      {
        questionText: "Kas autol on olemas kõik vajalikud kindlustused, registeerimised ja muud vajalikud dokumendatsioon",
        answerText: `Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf
              moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod.
              Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda
              shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea
              proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim
              aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.`
      },
      {
        questionText: "Kas autol on olemas kõik vajalikud kindlustused, registeerimised ja muud vajalikud dokumendatsioon",
        answerText: `Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf
              moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod.
              Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda
              shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea
              proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim
              aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.`
      },
      {
        questionText: "Kas autol on olemas kõik vajalikud kindlustused, registeerimised ja muud vajalikud dokumendatsioon",
        answerText: `Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf
              moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod.
              Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda
              shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea
              proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim
              aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.`
      },
      {
        questionText: "Kas autol on olemas kõik vajalikud kindlustused, registeerimised ja muud vajalikud dokumendatsioon",
        answerText: `Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf
              moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod.
              Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda
              shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea
              proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim
              aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.`
      }];

    return (<div>
      <Row>
        <Col sm={8} smOffset={2}>
          <h3 className="how-it-works__centered how-it-works__primary-header">Küsimused ja vastused</h3>
        </Col>
      </Row>
      <Row>
        <Col sm={8} smOffset={2}>
          <Collapse accordion={true}>
            {panels.map((panel, i) => (
              <Panel key={i} className="how-it-works__faq-panel" header={panel.questionText}>
                {/*<FaBeer style={{position: "absolute", right: "25px", top: "11px"}} />*/}
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
