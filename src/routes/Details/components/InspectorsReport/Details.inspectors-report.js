import React from 'react';
import {Button, Row, Col} from 'react-bootstrap';

import Skblock from '../Details.skblock';
import '../Details.scss';  // todo: remove?
import './Details.inspectors-report.scss';

// Images
import image_ok from './../../../../static/images/standard/ok.png';
import image_cancel from './../../../../static/images/standard/cancel.png';
import image_car_inspector from './assets/carinspector.png';
import translations from '../../../../store/locales/en';

/**
 * Draws a single icon (tick if pass or cross if not pass) and a description.
 */
const pointBlockFn = (point, i) => (
  <Col className="sk_details__report__category-col" key={i} md={6}>
    {(point.pass) ?
      (<img src={image_ok} width="24" className="sk_details__icon_list_image"/>) :
      (<img src={image_cancel} width="24" className="sk_details__icon_list_image"/>)}
    {point.text}
  </Col>);

/**
 * Inspector's report
 */
class Report extends React.Component {
  render() {
    const {categories, faults} = this.props.report;

    return (
      <Skblock header={translations.routes.details.components.inspector_report.header}>
        <Row>
          <Col md={3}><label className="sk_details__certified_developer">Artur P.</label></Col>
          <Col md={4}><img src={image_car_inspector} width="130" alt="happy"/></Col>
          <Col md={5} className="sk_details__certified_developer">
            <Button className="sk_details__report__button-have-questions">{translations.routes.details.components.inspector_report.question}</Button>
          </Col>
        </Row>

        {categories.map((category, i) => (
          <Row key={i} className="sk_details__report__category-block">
            <h4 className="sk_details__report__category-title">{category.title}</h4>

            <Row className="sk_details__report__category-row">
              {category.points.map((point, i) => i % 2 == 0
                ? (<div key={i}>{pointBlockFn(point, i)}</div>)
                : (<Row key={i}>{pointBlockFn(point, i)}</Row>))}
            </Row>

            <Row>
              <Col md={11}>
                <Button className="pull-right sk_details__report__button-show-all">{translations.routes.details.components.inspector_report.show_all}</Button>
              </Col>
            </Row>

          </Row>
        ))}

      </Skblock>);
  }
}

Report.propTypes = {
  report: React.PropTypes.shape({
    categories: React.PropTypes.arrayOf(React.PropTypes.shape({
      title: React.PropTypes.string.isRequired,
      points: React.PropTypes.arrayOf(React.PropTypes.shape({
        text: React.PropTypes.string.isRequired,
        pass: React.PropTypes.bool
      }))
    })),
    faults: React.PropTypes.arrayOf(React.PropTypes.shape({
      text: React.PropTypes.string.isRequired,
      img: React.PropTypes.string.isRequired
    }))
  })
};

export default Report;
