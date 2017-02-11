import React from "react";

import Skblock from "../BlockContainer";
import "../Details.scss";
import "./Details.inspectors-report.scss";
import SimpleCarousel from "../../../../components/SlickCarousel";
import {Row, Col} from "react-bootstrap";
import imageCarInspector from "./assets/carinspector2.jpg";
import {Translate} from 'react-redux-i18n';
import {Image} from "react-bootstrap";

/**
 * Inspector's report
 */
class InspectorsReport extends React.Component {
  render() {
    const {reportCategories, faults, inspector} = this.props.report;

    return (
      <Skblock header={<Translate value="details.components.inspector_report.header"/>}>
        <div className="inspectors-report">
          <Row className="inspector-block">
            <Col md={3}>
              <Image src={imageCarInspector} circle width={130} alt="happy" />
            </Col>
            <Col md={9} className='sk_details__certified_developer'>
              {inspector}
            </Col>
          </Row>

          <Col sm={12}>
            {reportCategories.map((category, i) =>  (
              <Row key={i} className="line-item">
              <h3>{category.title}</h3>
                {category.items.map((item, i ) => (
                  <Row key={i}>
                    <div>{item.title}</div>
                    <p>
                      {item.text}
                    </p>
                  </Row>
                ))}
            </Row>))}
          </Col>

          <Row>
            <Col xs={12}>
              <SimpleCarousel images={faults} title={<Translate value="details.components.inspector_report.pic_dents_txt"/>} />
            </Col>
          </Row>
        </div>
      </Skblock>);
  }
}
export default InspectorsReport;

InspectorsReport.propTypes = {
  report: React.PropTypes.shape({
    reportCategories: React.PropTypes.arrayOf(React.PropTypes.shape({
      title: React.PropTypes.string.isRequired,
      description: React.PropTypes.string,
      items: React.PropTypes.arrayOf(React.PropTypes.shape({
        title: React.PropTypes.string,
        text: React.PropTypes.string,
        pass: React.PropTypes.bool
      }))
    })),
    faults: React.PropTypes.arrayOf(React.PropTypes.shape({
      text: React.PropTypes.string,
      img: React.PropTypes.string
    }))
  }),
  sendQuestionByEmailAsync: React.PropTypes.func.isRequired
};

