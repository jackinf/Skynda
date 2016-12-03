/**
 * Created by jevgenir on 11/27/2016.
 */

import React from "react";
import {Well, Row, Col, Accordion, Panel} from "react-bootstrap";

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
          <Accordion>
            {panels.map((panel, i) => (
              <Panel key={i} className="how-it-works__faq-panel" header={panel.questionText} eventKey={i+1}>
                <Well>
                  {panel.answerText}
                </Well>
              </Panel>
            ))}
          </Accordion>
        </Col>
      </Row>
    </div>)
  }
}
